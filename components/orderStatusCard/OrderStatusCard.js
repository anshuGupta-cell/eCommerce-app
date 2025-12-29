import "./style.css"

const OrderStatusCard = () => {
    return (
        <div>
            <h2>All your ongoing orders </h2>
            <div class=" flex p-2">
                <ul class=" grid justify-center gap-1">
                    <div class="circle ">
                        <div class="sub-circle active">
                            <p>Order Placed</p>
                        </div>
                    </div>
                    <div class="bar active"></div>
                    <div class="circle ">
                        <div class="sub-circle active">
                            <p>Confirmed</p>
                        </div>
                    </div>
                    <div class="bar"></div>
                    <div class="circle ">
                        <div class="sub-circle">
                            <p>Order Completed</p>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
}

export default OrderStatusCard