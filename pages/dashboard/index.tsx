import React, { useState, MouseEvent, FormEvent } from 'react';
import { server } from '../../config';

const Dashboard = (props: any) => {

    const { item } = props;

    const [productName, setProductName] = useState<string>('')
    const [productDesc, setProductDesc] = useState<string>('')
    const [currentID, setCurrentID] = useState<number>(0)

    const handleNameChange = (e: React.FormEvent<HTMLInputElement>) => {
        setProductName(e.currentTarget.value)
        console.log(productName)
    }

    const handleDescChange = (e: React.FormEvent<HTMLInputElement>) => {
        setProductDesc(e.currentTarget.value)
        console.log(productDesc)
    }

    const handleProductID = (e: FormEvent<HTMLOptionElement>) => {
        setCurrentID(Number(e.currentTarget.value))
        console.log(currentID)
    }

    const submitCreateForm = async () => {
        await fetch('/api/item/create', {
            method: "POST",
            body: JSON.stringify({
                name: productName,
                description: productDesc
            })
        })
    }

    const submitModifyForm = async() => {
        await fetch('/api/item/update', {
            method: "PUT",
            body: JSON.stringify({
                name: productName,
                description: productDesc,
                id: currentID
            })
        })
    }

    const submitDeleteForm = async() => {
        await fetch('/api/item/delete' , {
            method: "DELETE",
            body: JSON.stringify({
                id: currentID
            })
        })
    }

    return (
        <div>
            <section>
                <h1>Dashboard administrateur</h1>
            </section>

            <section>
                <h2>Ajout d'un produit</h2>
                <form action="" method="get">
                    <div >
                        <label >Enter your name: </label>
                        <input type="text" name="name" id="name" required onChange={handleNameChange} />
                    </div>
                    <div >
                        <label>Enter your description: </label>
                        <input type="email" name="email" id="email" required onChange={handleDescChange} />
                    </div>
                    <div >
                        <input type="submit" value="Ajouter le produit" onClick={submitCreateForm} />
                    </div>
                </form>

                <section>
                    <h2>Modifier un produit</h2>
                    <label>Choose a product :</label>

                    <select name="produits" onClick={(e:any) => handleProductID(e)}>
                        {item.result.map((e: any) => 
                            <option value={e.id_produit}> {e.id_produit} - {e.nom}</option>
                        )}
                    </select>
                        <div >
                            <label >Enter a new name : </label>
                            <input type="text" name="name" id="name" required onChange={handleNameChange} />
                        </div>
                        <div >
                            <label>Enter a new description: </label>
                            <input type="email" name="email" id="email" required onChange={handleDescChange} />
                        </div>
                        <div >
                            <input value="Modifier le produit" onClick={submitModifyForm} />
                        </div>
                </section>

                <section>
                    <h2>Supprimer un produit</h2>
                    <label>Choose a product :</label>
                        
                    <select name="delete_produits" onClick={(e:any) => handleProductID(e)}>
                        {item.result.map((e: any) => 
                            <option value={e.id_produit}> {e.id_produit} - {e.nom}</option>
                        )}
                    </select>
                        <div >
                            <button  onClick={submitDeleteForm}>Supprimer le produit</button>
                        </div>
                </section>
            </section>
        </div>
    );
};

export const getStaticProps = async () => {
    const res = await fetch(`${server}/api/item`)
    const item = await res.json()
    console.log(item)

    return {
        props: {
            item
        }
    }
}

export default Dashboard;