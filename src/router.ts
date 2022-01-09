export default class RouterConfig {
    config(){
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
}