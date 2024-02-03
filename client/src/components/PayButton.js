import React ,{ useState} from 'react'
import { PayPalButton } from "react-paypal-button-v2";
import swal from 'sweetalert';
import { DatePicker, Form, Input, Button, Radio, Space, Rate } from "antd";
const PayButton = () => {
    const [paymentByPaypal, setPaymentByPaypal] = useState(true);
    const onChange1 = ({ target: { value } }) => {
        setPaymentByPaypal(value);
      };
  return (
    <div>
        <div className="flex justify-around items-center mt-3 ">
                <Radio.Group onChange={onChange1} value={paymentByPaypal}>
                  <Space direction="vertical">
                    <Radio value={false}>
                      Thanh Toán qua tài khoản ngân hàng.
                    </Radio>
                    <Radio value={true}>
                      Nhận Phòng và thanh toán trực tiếp tại quầy.
                    </Radio>
                  </Space>
                </Radio.Group>
              </div>
         {paymentByPaypal ? (
                
                <div className="w-full flex justify-center items-center mb-5">
            
                  <Button
                    htmlType="submit"
                    className=" flex justify-center items-center button_editAntd"
                  >
                    Đặt Phòng
                  </Button>
            
              </div>
                
              ) : (
                <div className="mt-3 w-[full] flex justify-center items-center">
                  <PayPalButton
                    style={{ width: 300 }}
                    amount="0.01"
                    // options={{
                    //   clientId: process.env.PAYPAL_CLIENT_ID
                    // }}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                      console.log(details);
                      // OPTIONAL: Call your server to save the transaction
                      return fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                          orderID: data.orderID,
                        }),
                      });
                    }}
                    onError={()=>{
                      swal('Báo lỗi ! ' ,'Xảy ra lỗi trong quá trình thanh toán ! ' , 'warning');
                    }}
                  />
                </div>
              )}
    </div>
  )
}

export default PayButton