export interface Disposable {
    dispose(): void;
}

class _Disposable implements Disposable {
    constructor(dispose: () => void) {
        this._dispose = dispose
    }
    dispose() {
        this._dispose()
    }
    private _dispose: () => void
}

export class Cancelable {
    async cancel() {
        let fs = Array<Promise<void>>()
        this.cancels.forEach((value) => {
            fs.push(value())
        })
        this.cancels.clear()
        await Promise.all(fs)
    }
    
    whenCancel(f: () => Promise<void>): Disposable {
        let id = this.id++
        this.cancels.set(id, f)
        return new _Disposable(() => {
            this.cancels.delete(id)
        })
    }
    private id = -2147483648
    private cancels = new Map<number, () => Promise<void>>()
}