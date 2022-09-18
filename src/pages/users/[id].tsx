import {useRouter} from "next/router";
import Center from "../../components/Center";

export default function UserPage() {
    const router = useRouter()

    const { id } = router.query;

    return <Center>User id: {id}</Center>
}