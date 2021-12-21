import {Cancelable} from '../src/index';

describe('index', () => {
  it('cancel', () => {
      var i = 0
      let cancelable = new Cancelable()
      cancelable.whenCancel(()=>{
          i = 1
      })
      cancelable.cancel()
      expect(i).toEqual(1)
  });
  it('dispose', ()=>{
    var i = 0
    let cancelable = new Cancelable()
    let disposable = cancelable.whenCancel(()=>{
        i = 1
    })
    disposable.dispose()
    cancelable.cancel()
    expect(i).toEqual(0)
  })
});
