export interface Disposable {
    dispose():void;
}

class Dispose implements Disposable {
    constructor(dispose: () => void) {
        this._dispose = dispose
    }
    dispose() {
        this._dispose()
    }
    private _dispose: () => void
}

export class Cancelable {
    cancel() {
        this._cancels.forEach((value) => {
            value()
        })
        this._cancels.clear()
    }
    whenCancel(f: () => void): Disposable {
        let id = this._id++
        this._cancels.set(id, f)
        return new Dispose(() => {
            this._cancels.delete(id)
        })
    }
    private _id = 0
    private _cancels = new Map<number, () => void>()
}