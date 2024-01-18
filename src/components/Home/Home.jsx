import BistroBrief from "./BistroBrief/BistroBrief";
import Header from "./Header/Header";
import OrderOnline from "./OrderOnline/OrderOnline";

export default function Home() {
  return (
    <div>
      <Header></Header>
      <OrderOnline></OrderOnline>
      <BistroBrief></BistroBrief>
    </div>
  )
}
