import Services from './data_service';
import {data} from '../../test_drive/api/mockApi'
class TestServices {
    static main() {
        Services.getWebTitle().then(data => {
            console.log("testing get web: ", data);
        });

        Services.getTestDrives().then(data => {
            console.log("get test Drives: ", data);
        });

        // Services.createTestDrive(data[0]).then(data => {
        //     console.log("create test case: ", data);
        // });

        // Services.createQuestions(data[0].questions).then(data => {
        //     console.log("create test case: ", data);
        // })
        // console.log("testing get testdrives: ", Services.getTestDrives());

        // Services.getTearmSet().then(data=>{
        //     console.log("Term sets: ", data);
        // })
    }

}

TestServices.main();


export default TestServices;