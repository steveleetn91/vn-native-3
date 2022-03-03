export default class RouterConfig {
    config() : Array<{
        url : string,
        name : string
    }>{
        return [
            {
                url:"/",
                name:"IndexPage"
            },
            {
                url:"/page/example",
                name:"ExamplePage"
            },
            {
                url:"/index.html",
                name:"IndexPage"
            }
        ]
    }
    notFound() : string {
         // 404 page
        return "NotFoundPage";
    }
}