import PropTypes from "prop-types";

const Button = ({ name }) => {
    return (
        <div>
            <button className="px-5 py-2 m-3 bg-gray-200 rounded-lg">{name}</button>
        </div>
    );
};

// Setting default prop value for `name`
Button.defaultProps = {
    name: "Click me",
};

// Defining prop types for `Button`
Button.propTypes = {
    name: PropTypes.string,
};

export default Button;
