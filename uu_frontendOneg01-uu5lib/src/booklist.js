//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import BookUpdateForm from "./book-update-form";
import Lsi from "./book-lsi.js";
// import "uu5tilesg02";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Booklist",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Booklist = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    // const [formOpened, setFormOpened] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [bookList, setBookList] = useState([
      {
        id: 1,
        name: "20 000 mil pod mořem",
        date: "2021-12-01T00:30:40Z",
        author: "Jules Verne",
        cover:
          "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/2/20-000-mil-pod-morem-9788024733883.jpg.webp",
      },
      {
        id: 2,
        name: "Vinetou",
        author: "Karl Marx",
        cover:
          "https://www.knihydobrovsky.cz/thumbs/book-detail/mod_eshop/produkty/v/vinnetou-i-indianske-leto-9788072641543.jpg.webp",
      },
    ]);

    //@@viewOff:private

    //@@viewOn:interface
    const handleCreateBook = (newBookData) => {
      const newBookList = bookList.slice();
      const bookId = new Date().toISOString();
      newBookList.push({ id: bookId, ...newBookData });
      setBookList(newBookList);
      setSelectedBook(null);
    };

    const handleUpdateBook = (updatedBookData) => {
      // const newBookList = [...bookList];
      // setBookList((newBookList[newBookList.findIndex((book) => book.id === updatedBookData.id)] = updatedBookData));
      // setSelectedBook(null);

      const newBookList = bookList.slice();
      const bookIndex = newBookList.findIndex((book) => book.id === updatedBookData.id);
      newBookList[bookIndex] = updatedBookData;
      setBookList(newBookList);
      setSelectedBook(null);
    };

    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    // const getBooklist = () => {
    //   const bookCompList = [];
    //   bookList.forEach((book) => {
    //     bookCompList.push(<Bookdetail name={book.name} author={book.author} cover={book.cover} />);
    //   });
    //   return bookCompList;
    // };

    function getColumns() {
      return [
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.name} />,
          cell: (cellProps) => cellProps.data.name,
        },
        {
          header: <UU5.Bricks.Lsi lsi={Lsi.date} />,
          cell: (cellProps) => {
            if (cellProps.data.date) {
              return new Date(cellProps.data.date).toLocaleString(UU5.Common.Tools.getLanguage());
            } else {
              return "";
            }
          },
        },
        {
          header: "Author",
          cell: (cellProps) => cellProps.data.author,
        },
        {
          header: "Cover",
          cell: (cellProps) => <UU5.Bricks.Image height="100px" src={cellProps.data.cover} />,
        },
        {
          cell: (cellProps) => {
            return (
              <>
                {/*<UU5.Bricks.Button colorSchema="blue" onClick={() => setFormOpened(true)}><UU5.Bricks.Icon icon="mdi-pencil" /></UU5.Bricks.Button>*/}
                <UU5.Bricks.Button colorSchema="blue" onClick={() => setSelectedBook(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-pencil" />
                </UU5.Bricks.Button>
                {/* <UU5.Bricks.Button colorSchema="red" onClick={() => setBookToDelete(cellProps.data)}>
                  <UU5.Bricks.Icon icon="mdi-close" />
                </UU5.Bricks.Button> */}
              </>
            );
          },
        },
      ];
    }

    // const tilesList = UU5.Common.Tools.findComponent("UU5TilesList");

    return currentNestingLevel ? (
      <div {...attrs}>
        {/* <BookUpdateForm shown={formOpened} setFormOpened={setFormOpened} /> */}
        <BookUpdateForm
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          handleCreateBook={handleCreateBook}
          handleUpdateBook={handleUpdateBook}
        />
        <UU5.Bricks.Button colorSchema={"green"} onClick={() => setSelectedBook({})}>
          <UU5.Bricks.Icon icon={"mdi-plus"} />
          <UU5.Bricks.Lsi lsi={Lsi.create} />
        </UU5.Bricks.Button>
        <Uu5Tiles.List columns={getColumns()} data={bookList} rowHeight={150} rowAlignment="center" />
      </div>
    ) : null;
    //@@viewOff:render
  },
});

export default Booklist;
