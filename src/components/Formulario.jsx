import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { monedas } from "../data/monedas"
import { useSelectMonedas } from "../hooks/useSelectMonedas"
import { Error } from "./Error"

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

export const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
    const [cripto, SelectCripto] = useSelectMonedas('Elige tu moneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=MXN'

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const obj = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

                return obj
            })

            setCriptos(arrayCriptos);
        }

        consultarAPI()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if ([moneda, cripto].includes('')) {
            setError(true)
            return 
        }

        setError(false)
        setMonedas({
            moneda,
            cripto
        })
    }

    return (
        <>
            { error && <Error>Todos los son Obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >

                <SelectMonedas />
                <SelectCripto />

                <InputSubmit
                    type="submit"
                    value="Cotizar"
                />
            </form>
        </>
    )
}
