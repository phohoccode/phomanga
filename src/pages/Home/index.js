import { Fragment } from "react"
import Slides from "../../components/Layout/components/Slides"
import Comics from "../../components/Layout/components/Comics"

function Home() {
    return (
        <Fragment>
            <Slides api={'https://otruyenapi.com/v1/api/home'} />
            <Comics api={'https://otruyenapi.com/v1/api/danh-sach/truyen-moi?page=2'} />
            <Comics api={'https://otruyenapi.com/v1/api/danh-sach/sap-ra-mat?page=1'} />
            <Comics api={'https://otruyenapi.com/v1/api/danh-sach/dang-phat-hanh?page=1'} />
            <Comics api={'https://otruyenapi.com/v1/api/danh-sach/hoan-thanh?page=1'} />
        </Fragment>
    )
}

export default Home