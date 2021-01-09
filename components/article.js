
function Article({ data }) {

    const { display_url, taken_at_timestamp } = data;
    const date = new Date(parseFloat(String(String(taken_at_timestamp) + '000')));
    return (<>
        <img src={display_url} />
        <div className="hidden group-hover:block bg-gray-300 rounded-b-lg p-2 font-medium">
            <h3 className="text-green-500 text-center">
            📅 {`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</h3>
        </div>
    </>
    );
}

export default Article;