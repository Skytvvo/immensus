import { Observable } from 'rxjs';
import { CreatePostDto, GetPostDto } from "../dto";
import { Post } from "../entities";

export interface IPostRpcService{
  CreatePost(createPostDto: CreatePostDto): Observable<undefined>;
  GetPost(getPostDto: GetPostDto): Observable<Post>;
}
