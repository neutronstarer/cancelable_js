import {Cancelable} from '../src/index';


describe('index', () => {
  it('cancel', async () => {
      var i = 0
      let cancelable = new Cancelable()
      cancelable.whenCancel(async ()=>{
          i = 1
      })
      await cancelable.cancel()
      expect(i).toEqual(1)
  });
  it('dispose', async ()=>{
    var i = 0
    let cancelable = new Cancelable()
    let disposable = cancelable.whenCancel(async ()=>{
        i = 1
    })
    disposable.dispose()
    await cancelable.cancel()
    expect(i).toEqual(0)
  })
});


