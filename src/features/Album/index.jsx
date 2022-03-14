import React from "react";
import AlbumList from "./components/AlbumList";

AlbumFeature.propTypes = {};

function AlbumFeature(props) {
    const albumList = [
        {
            id: 1,
            name: "Album",
            thumbnailUrl:
                "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/a/1/a/2/a1a2f2a2e0ee2e054b8896595f9d92cc.jpg",
        },
        {
            id: 2,
            name: "Album2",
            thumbnailUrl:
                "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/3/3/4/3/33433ffc8eece04b24b6c1ee54a845cc.jpg",
        },
        {
            id: 3,
            name: "Album3",
            thumbnailUrl:
                "https://photo-resize-zmp3.zadn.vn/w320_r1x1_webp/cover/b/3/b/e/b3be18e7cfbaf39506e499a13816aefe.jpg",
        },
    ];

    return (
        <div>
            <AlbumList albumList={albumList} />
        </div>
    );
}

export default AlbumFeature;
