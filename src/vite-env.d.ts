/// <reference types="vite/client" />
declare module "*.png" {
    const value: string;
    export default value;
}
declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}
declare module 'path' {
    const path: any;
    export default path;
}

declare namespace NodeJS {
    interface ProcessEnv {
        REACT_APP_DEPLOY_URL: string;
        DOMEN_NAME: string;
    }
}