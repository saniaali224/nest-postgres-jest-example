class mytest{
    test=[];

    addtest(name){
        this.test.push(name);
    }
}

describe('mytest',()=>{
    it('returns true',()=>{
        const mytest= new Mytest();

        expect(mytest.test.length).toEqual(0);
    });
});