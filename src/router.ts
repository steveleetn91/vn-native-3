import IndexPage from "../pages";
export default class RouterConfig {
    config(){
        return [
            {
                url:"/",
                page: IndexPage,
                name:"IndexPage"
            },
            {
                url:"/index.html",
                page: IndexPage,
                name:"IndexPage"
            },
            {
                url:"/home/test",
                page: IndexPage,
                name:"IndexPage"
            },
            {
                url:"/home/ok",
                page: IndexPage,
                name:"IndexPage"
            }
        ]
    }
}