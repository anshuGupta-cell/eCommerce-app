import Button from "../button/Button"
import "./style.css"

const OrderDetails = (props) => {
const {
  placeOrder,
  mobile,
  setMobile,
  address,
  setAdress
} = props


  return (
    <div className="bg-orange-100 dark:bg-slate-800">

      <form className=" form grid gap-3 p-4 rounded" onSubmit={(e)=>placeOrder(e)}>
        <h3 className="font-bold text-xl"> Order Delivery Details</h3>
        <ul>
          <label >Mobile Number</label>
          <input type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Mobile Number" required/>
        </ul>

        <h3 className="font-semibold text-lg">Enter Adress Details</h3>
        <ul>
          <label >State</label>
          <input type="text" value={address} onChange={(e)=>setAdress(e.target.value)} placeholder="Enter Adress" required/>
        </ul>
        <ul className="flex justify-end py-2">
          <Button>
            Place Order
          </Button>
        </ul>
      </form>
    </div>
  )
}

export default OrderDetails