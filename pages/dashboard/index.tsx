import React, { useState, MouseEvent, FormEvent, ChangeEventHandler } from 'react';
import Header from '../../components/Header';
import { server } from '../../config';
import { Notification } from '@mantine/core';
import { Check } from 'tabler-icons-react';

const Dashboard = (props: any) => {

    const { item } = props;

    const [productName, setProductName] = useState<string>('')
    const [productDesc, setProductDesc] = useState<string>('')
    const [currentID, setCurrentID] = useState<number>(0)
    const [productImage, setProductImage] = useState<string>('')
    const [productPrice, setProductPrice] = useState<string>('')
    const [productStock, setProductStock] = useState<string>('')
    const [createBoolean, setCreateBoolean] = useState<boolean>(false)
    const [modifyBoolean, setModifyBoolean] = useState<boolean>(false)
    const [deleteBoolean, setDeleteBoolean] = useState<boolean>(false)

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

    const handleImgChange = (e: React.FormEvent<HTMLInputElement>) => {
        setProductImage(e.currentTarget.value)
        console.log(productImage)
    }

    const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
        setProductPrice(e.currentTarget.value)
    }

    const handleStockChange = (e: React.FormEvent<HTMLInputElement>) => {
        setProductStock(e.currentTarget.value)
    } 

    const submitCreateForm = async () => {
        await fetch('/api/item/create', {
            method: "POST",
            body: JSON.stringify({
                name: productName,
                description: productDesc,
                image: productImage,
                prix: Number(productPrice),
                stock: Number(productStock)
            })
        })
        setCreateBoolean(true);
    }

    const submitModifyForm = async() => {
        await fetch('/api/item/update', {
            method: "PUT",
            body: JSON.stringify({
                name: productName,
                description: productDesc,
                image: productImage,
                prix: Number(productPrice),
                stock: productStock,
                id: currentID
            })
        })
        setModifyBoolean(true)
    }

    const submitDeleteForm = async() => {
        await fetch('/api/item/delete' , {
            method: "DELETE",
            body: JSON.stringify({
                id: currentID
            })
        })
        setDeleteBoolean(true)
    }

    return (
        <div>

            <Header titre={'Dashboard'} />

            {createBoolean || modifyBoolean || deleteBoolean 
            
            ? 

                <Notification icon={<Check size={18} />} color="teal" title="Notification">
                Opération réussie !
                </Notification>
            
            :

            ''

            }
            <section>
                <h1>Dashboard administrateur</h1>
            </section>

            <section>
                <h2>Ajout d'un produit</h2>
                <form action="" method="get">
                    <div >
                        <label >Enter your name: </label>
                        <input type="text" name="name" id="name" onChange={handleNameChange} />
                    </div>
                    <div >
                        <label>Enter your description: </label>
                        <input type="description" name="description" id="description" onChange={handleDescChange} />
                    </div>
                    <div >
                        <label>Enter a price: </label>
                        <input name="price" id="price" onChange={handlePriceChange} />
                    </div>
                    <div >
                        <label>Enter a stock: </label>
                        <input name="stock" id="stock" onChange={handleStockChange} />
                    </div>
                    <div >
                        <label>Enter a image URL: </label>
                        <input name="image" id="image" onChange={handleImgChange} />
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
                            <input type="text" name="name" id="name" onChange={handleNameChange} />
                        </div>
                        <div >
                            <label>Enter a new description: </label>
                            <input type="text" name="text" id="text" onChange={handleDescChange} />
                        </div>
                        <div >
                        <label>Enter a new price: </label>
                        <input name="price" id="price" onChange={handlePriceChange} />
                        </div>
                        <div >
                        <label>Enter a new stock: </label>
                        <input name="stock" id="stock" onChange={handleStockChange} />
                    </div>
                        <div >
                            <label>Enter a image URL: </label>
                            <input name="image" id="image" onChange={handleImgChange} />
                        </div>
                        <div >
                            <button onClick={submitModifyForm}>Modifier le produit</button>
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