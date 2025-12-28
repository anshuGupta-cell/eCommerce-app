import Button from "../button/Button"
import "./style.css"

const OrderDetails = () => {


  
  return (
    <div className="">

      <form className="bg-orange-100 dark:bg-slate-800 form grid gap-3 p-4 rounded">
        <h3 className="font-bold text-xl"> Order Delivery Details</h3>
        <ul>
          <label for="">Mobile Number</label>
          <input type="text" placeholder="Enter Mobile Number" />
        </ul>

        <h3 className="font-semibold text-lg">Enter Adress Details</h3>
        <ul>
          <label for="">State</label>
          <input type="text" placeholder="Enter Adress" />
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