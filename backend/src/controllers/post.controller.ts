// --- Assume this is in a file like 'controllers/post.controller.ts' ---
import type { Context } from 'hono';
import {
    CreatePostModel,
    UpdatePostModel,
    DeletePostModel,
    CreateCommentModel,
    LikeUnlikePostModel,
    type LikeUnlikePostInput,
    type CreateCommentInput,
    type CreatePostInput,
    type UpdatePostInput
} from '../models/post.model.js';
import { Prisma } from '../generated/prisma/index.js'; // For Prisma error handling

// createPost controller
export const createPost = async (c: Context) => {
    try {
        const body = await c.req.json() as CreatePostInput;
        // Validation for required fields based on the new CreatePostInput
        if (!body.content || body.authorId === undefined) {
            return c.json({error: 'Missing required fields: content, authorId'}, 400);
        }
        const newPost = await CreatePostModel(body);
        return c.json(newPost, 201);
    } catch (error: any) {
        console.error('Error creating post:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') { // Foreign key constraint failed
                // This can happen if the authorId provided does not exist in the User table.
                return c.json({ error: 'Invalid authorId. Ensure the author exists.' }, 400);
            }
        }
        // Handle custom error for author not found from CreatePostModel
        if (error.message.includes("Author with ID") && error.message.includes("not found")) {
            return c.json({ error: error.message }, 400); // Or 404
        }
        return c.json({ error: 'Failed to create post', details: error.message || 'Unknown error' }, 500);
    }
};

export const updatePost = async (c: Context) => {
    try {
        const postIdString = c.req.param('id');

        const rawBody: unknown = await c.req.json();

        if (typeof rawBody !== 'object' || rawBody === null) {
            return c.json({ error: 'Invalid request body: Expected a JSON object.' }, 400);
        }

        // Construct UpdatePostInput more safely, now including optional arrays for related entities
        const updateData: UpdatePostInput = {};
        const potentialBody = rawBody as Record<string, unknown>;

        // Direct fields
        if (potentialBody.content !== undefined) {
            if (typeof potentialBody.content === 'string') {
                updateData.content = potentialBody.content;
            } else { /* Optional: return error for wrong type */ }
        }

        // Related entities: imageUrls
        if (potentialBody.imageUrls !== undefined) {
            if (Array.isArray(potentialBody.imageUrls) && potentialBody.imageUrls.every(item => typeof item === 'string')) {
                updateData.imageUrls = potentialBody.imageUrls as string[];
            } else { /* Optional: return error for wrong type */ }
        }

        // Related entities: newFiles
        if (potentialBody.newFiles !== undefined) {
            if (Array.isArray(potentialBody.newFiles) && potentialBody.newFiles.every(item =>
                typeof item === 'object' && item !== null && typeof (item as any).name === 'string' && typeof (item as any).url === 'string'
            )) {
                updateData.newFiles = potentialBody.newFiles as { name: string; url: string }[];
            } else { /* Optional: return error for wrong type */ }
        }

        // Related entities: linkUrls
        if (potentialBody.linkUrls !== undefined) {
            if (Array.isArray(potentialBody.linkUrls) && potentialBody.linkUrls.every(item => typeof item === 'string')) {
                updateData.linkUrls = potentialBody.linkUrls as string[];
            } else {}
        }

        // Related entities: tagNames
        if (potentialBody.tagNames !== undefined) {
            if (Array.isArray(potentialBody.tagNames) && potentialBody.tagNames.every(item => typeof item === 'string')) {
                updateData.tagNames = potentialBody.tagNames as string[];
            } else {}
        }


        if (!postIdString) {
            return c.json({ error: 'Post ID is required in the URL path.' }, 400);
        }

        const postId = parseInt(postIdString, 10);
        if (isNaN(postId)) {
            return c.json({ error: 'Invalid post ID format in URL. Must be an integer.' }, 400);
        }

        // Check if any valid update data was actually provided
        if (Object.keys(updateData).length === 0) {
            return c.json({ error: 'No valid update data provided. Please ensure fields are of the correct type.' }, 400);
        }

        const updatedPost = await UpdatePostModel(postId, updateData);
        return c.json(updatedPost, 200);

    } catch (error: any) {
        console.error('Error updating post:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return c.json({ error: 'Database error during update.', details: error.message }, 500);
        }
        if (error.statusCode === 404) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'Failed to update post.', details: error.message || 'Unknown error' }, 500);
    }
};


// deletePost controller (existing function)
export const deletePost = async (c: Context) => {
    try {
        const body = await c.req.json();
        const postIdString = body.id;


        if (postIdString === undefined || postIdString === null) {
            return c.json({ error: 'Post ID is required in the request body.' }, 400);
        }

        const postId = parseInt(String(postIdString), 10);

        if (isNaN(postId)) {
            return c.json({ error: 'Invalid post ID format. Must be an integer.' }, 400);
        }

        const deletedPost = await DeletePostModel(postId);

        return c.json({ message: 'Post deleted successfully', data: deletedPost }, 200);

    } catch (error: any) {
        console.error('Error deleting post:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return c.json({ error: 'Database error during deletion.', details: error.message }, 500);
        }

        if (error.statusCode === 404) {
            return c.json({ error: error.message }, 404);
        }

        return c.json({ error: 'Failed to delete post.', details: error.message || 'Unknown error' }, 500);
    }
};
export const createComment = async (c: Context) => {
    try {
        const postIdString = c.req.param('postId'); // Assuming postId comes from URL parameter
        const body = await c.req.json() as Partial<CreateCommentInput>; // Use Partial for initial validation

        if (!postIdString) {
            return c.json({ error: 'Post ID is required in the URL path.' }, 400);
        }
        const postId = parseInt(postIdString, 10);
        if (isNaN(postId)) {
            return c.json({ error: 'Invalid Post ID format in URL.' }, 400);
        }

        // Validate required fields from the body
        if (!body.content || typeof body.content !== 'string' || body.content.trim() === "") {
            return c.json({ error: 'Comment content is required and must be a non-empty string.' }, 400);
        }
        if (body.userId === undefined || typeof body.userId !== 'number' || isNaN(body.userId)) {
            return c.json({ error: 'User ID is required and must be a number.' }, 400);
        }

        const input: CreateCommentInput = {
            content: body.content,
            postId: postId,
            userId: body.userId

        };

        const newComment = await CreateCommentModel(input);
        return c.json(newComment, 201); // 201 Created

    } catch (error: any) {
        console.error('Error creating comment:', error);
        if (error.message.includes("not found")) { // Catch specific "not found" errors from the model
            return c.json({ error: error.message }, 404);
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // P2003 can happen if userId or postId is invalid foreign key
            if (error.code === 'P2003') {
                return c.json({ error: 'Invalid user or post ID for comment operation.' }, 400);
            }
            return c.json({ error: 'Database error during comment creation.', details: error.message }, 500);
        }
        return c.json({ error: 'Failed to create comment.', details: error.message || 'Unknown error' }, 500);
    }
};

export const likeUnlikePost = async (c: Context) => {
    try {
        const postIdString = c.req.param('postId');
        const body = await c.req.json();
        const userId = body.userId;

        if (!postIdString) return c.json({ error: 'Post ID is required in the URL path.' }, 400);
        const postId = parseInt(postIdString, 10);
        if (isNaN(postId)) return c.json({ error: 'Invalid Post ID format in URL.' }, 400);

        if (userId === undefined || typeof userId !== 'number' || isNaN(userId)) {
            return c.json({ error: 'User ID is required in the request body and must be a number.' }, 400);
        }

        const input: LikeUnlikePostInput = { userId, postId };
        const result = await LikeUnlikePostModel(input);
        return c.json(result, 200);
    } catch (error: any) {
        console.error('Error liking/unliking post:', error);
        if (error.message.includes("not found")) {
            return c.json({ error: error.message }, 404);
        }
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2003') return c.json({ error: 'Invalid user or post ID for like operation.' }, 400);
            return c.json({ error: 'Database error during like/unlike operation.', details: error.message }, 500);
        }
        return c.json({ error: 'Failed to like/unlike post.', details: error.message || 'Unknown error' }, 500);
    }
};