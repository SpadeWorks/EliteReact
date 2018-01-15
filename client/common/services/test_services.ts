import Services from './data_service';

class TestServices {
    static main(){
        console.log("testing get web: ", Services.getWebTitle());
    }
}

TestServices.main();


export default TestServices;