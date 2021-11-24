import IndexPage from "../pages";
export default class RouterConfig {
    config(){
        return [
            {
                url:"/",
                page: IndexPage
            }
        ]
    }
}