import pnp from 'sp-pnp-js';

declare var process: { exit(code?: number): void };

class Services {
    static getWebTitle() {
        // run some debugging
        pnp.sp.web.select("Title", "Description").get().then(w => {
            console.log(w);
        });
    }
}

export default Services;