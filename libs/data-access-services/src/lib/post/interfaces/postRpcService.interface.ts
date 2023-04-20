import { Observable } from 'rxjs';
import { CreatePostDto, GetPostDto, GetPostsDto, PatchPostDto } from "../dto";
import { Post } from "../entities";

export interface IPostRpcService{
  CreatePost(createPostDto: CreatePostDto): Observable<undefined>;
  GetPost(getPostDto: GetPostDto): Observable<Post>;
  GetPosts(getPostsDto: GetPostsDto): Observable<Post>;
  PatchPost(patchPostDto: PatchPostDto): Observable<Post>
}
