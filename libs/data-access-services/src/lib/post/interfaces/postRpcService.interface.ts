import { Observable } from 'rxjs';
import { CreatePostDto, DeletePostDto, GetPostDto, GetPostsDto, PatchPostDto } from "../dto";
import { Post } from "../entities";

export interface IPostRpcService{
  CreatePost(createPostDto: CreatePostDto): Observable<undefined>;
  GetPost(getPostDto: GetPostDto): Observable<Post>;
  GetPosts(getPostsDto: GetPostsDto): Observable<Post>;
  PatchPost(patchPostDto: PatchPostDto): Observable<Post>
  DeletePost(deletePostDto: DeletePostDto): Observable<undefined>
}
