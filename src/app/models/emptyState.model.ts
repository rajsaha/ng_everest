export class EmptyState {
    type: string;
    isSelf: boolean;

    constructor() {
        this.type = "resource";
        this.isSelf = false;
    }
}