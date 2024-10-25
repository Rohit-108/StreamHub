// eslint-disable-next-line react/prop-types
const Button = ({ name }) => {
    return (
        <div>

            <button className="px-5 py-2 m-3 bg-gray-200 rounded-lg">{name}</button>
        </div>
    )
}

export default Button