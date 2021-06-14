export abstract class BaseRequestDto<TModel> {
    public abstract getInstance(): Partial<TModel>;
}
