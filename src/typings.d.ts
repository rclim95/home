// Enable support for importing HTML from import statements
declare module "*.html" {
    const content: string;
    export default content;
}

// Enable support for importing JSON from import statements
declare module "*.json" {
    const content: any;
    export default content;
}