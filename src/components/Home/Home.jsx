import { Helmet } from "react-helmet-async";
import BistroBrief from "./BistroBrief/BistroBrief";
import Header from "./Header/Header";
import OrderOnline from "./OrderOnline/OrderOnline";
import PopularItem from "./PopularItems/PopularItem";
import ChefRecommend from "./ChefRecommend/ChefRecommend";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Header></Header>
      <OrderOnline></OrderOnline>
      <PopularItem></PopularItem>
      <ChefRecommend></ChefRecommend>
      <BistroBrief></BistroBrief>
    </div>
  )
}
