export { CommentForm } from './components/CommentForm';
export { CommentCard } from './components/CommentCard';
export { CommentEditForm } from './components/CommentEditForm';
export { CommentsSection } from './components/CommentsSection';

export { useComments } from './hooks/useComments';
export { useCreateComment } from './hooks/useCreateComment';
export { useUpdateComment } from './hooks/useUpdateComment';
export { useDeleteComment } from './hooks/useDeleteComment';

export type { Comment, Autor, CreateCommentInput, UpdateCommentInput, CommentFormValues } from './types/commentTypes';

export { commentService } from './services/commentService';

export { commentSchema } from './schemas/commentSchema'; 