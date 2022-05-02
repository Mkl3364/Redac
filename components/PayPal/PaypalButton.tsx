import { usePayPalScriptReducer, PayPalButtonsComponentProps, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { query, collection, getDocs, where, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PaypalButton(props: any) {

    const [orderId, setOrderId] = useState<string>('')
    const [user, loading, error] = useAuthState(auth);

    const router = useRouter()

    const storeOrderIdInFirestore = async (orderId: string) => {
        try {
            await setDoc(doc(db, "transactions", "test"), {
                order_id : orderId,
                user_id : user?.uid
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    const { value, name, description } = props;
    /**
     * usePayPalScriptReducer use within PayPalScriptProvider
     * isPending: not finished loading(default state)
     * isResolved: successfully loaded
     * isRejected: failed to load
     */
    const [{ isPending }] = usePayPalScriptReducer();
    const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
      style: { layout: "vertical" },
      createOrder(data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              items : [
                  {
                      name: `${name}`,
                      description: `${description}`,
                      quantity: "1",
                      unit_amount: {
                          currency_code: "EUR",
                          value: `${value}`
                      }

                  }
              ],
              amount: {
                currency_code: 'EUR',
                value: `${value}`,
                breakdown: {
                    item_total: { value: `${value}`, currency_code: 'EUR' }
                }
              }
            }
          ]
        });
      },
      onApprove(data, actions) {
        /**
         * data: {
         *   orderID: string;
         *   payerID: string;
         *   paymentID: string | null;
         *   billingToken: string | null;
         *   facilitatorAccesstoken: string;
         * }
         */
        return actions.order!.capture().then(async (details) => {
          
            router.push('/sales/success')
            console.log("Data details: " + JSON.stringify(data, null, 2));
            setOrderId(data.orderID)
            await storeOrderIdInFirestore(data.orderID)
        });
      }
    };
    return (
      <>
        {isPending ? <h2>Load Smart Payment Button...</h2> : null}
        <PayPalButtons {...paypalbuttonTransactionProps} />
      </>
    );
  }