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
        this._cancels.forEach((value) => {
            fs.push(value())
        })
        this._cancels.clear()
        await Promise.all(fs)
    }
    
    whenCancel(f: () => Promise<void>): Disposable {
        let id = this._id++
        this._cancels.set(id, f)
        return new _Disposable(() => {
            this._cancels.delete(id)
        })
    }
    private _id = -2147483648
    private _cancels = new Map<number, () => Promise<void>>()
}