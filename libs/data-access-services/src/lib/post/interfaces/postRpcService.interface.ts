import { Observable } from 'rxjs';
import { CreatePostDto } from "../dto";

export interface IPostRpcService{
  getData(dto: unknown): Observable<undefined>;
  createPost(createPostDto: CreatePostDto): Observable<undefined>;
}
