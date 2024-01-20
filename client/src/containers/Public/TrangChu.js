import React, { useState } from 'react'
import bg from '../../assets/bg.jpg';
import bannerIntro from '../../assets/banner-intro.jpg'
import icons from '../../ultils/icons'

require('../containers.css')

const { FaHome, MdPeopleAlt, BsImage } = icons;

const images = [
  {
    url: "https://th.bing.com/th/id/OIP.j-fAW_7Soio0SrdLZHxEfgHaE8?rs=1&pid=ImgDetMain",
    className: "banner_active",
    defaultclass: "bannerImg1",
  },
  {
    url: "https://th.bing.com/th/id/OIP.j-fAW_7Soio0SrdLZHxEfgHaE8?rs=1&pid=ImgDetMain",
    className: "banner_active",
    defaultclass: "bannerImg2",
  }, {
    url: "https://th.bing.com/th/id/OIP.j-fAW_7Soio0SrdLZHxEfgHaE8?rs=1&pid=ImgDetMain",
    className: "banner_active",
    defaultclass: "bannerImg3",
  },
];
const Image = ({ url, className, selected, onClick, defaultclass }) => {
  // Nếu tấm hình được chọn, thì class sẽ là class của props, ngược lại sẽ là class mặc định
  const imageClass = selected ? className : defaultclass;

  // Đây là style cho tấm hình, bao gồm kích thước và bo góc
  const style = {
    margin: 10,
    width: 200,
    height: 200,
  };

  return <img src={url} style={style} alt='' className={`${imageClass} ${defaultclass} rounded-full`} onClick={onClick} />;
};

const TrangChu = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleClick = (index) => {
    if (index === selectedIndex) {
      setSelectedIndex(-1);
    } else {
      setSelectedIndex(index);
    }
  };



  return (
    <div className='trangchu'>
      <div className='tc-bg-banner '>
        <img src={`${bg}`} alt='' />
      </div>
      <div className='banner'>

        <div className='bannerImage' >
          {images.map((image, index) => (
            <Image
              key={index}
              url={image.url}
              className={image.className}
              selected={index === selectedIndex}
              onClick={() => handleClick(index)}
              defaultclass={image.defaultclass}
            />
          ))}
        </div>
        <div className='bannerTilte'>
          <div className='bannerItem'>Cho Thuê Homestay</div>
          <div className='bannerDisc font-semibold '>“Nhanh Chóng - Tận Tâm - Chuyên Nghiệp!”</div>

        </div>

      </div>
      <div className='banner-total '>
        <div className='flex justify-center items-center gap-2'><FaHome size={50} className='' />
          <div className='row banner-total-content '>
            <div>10+</div>
            <div>Homestay</div>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2'><MdPeopleAlt size={50} className='' />
          <div className='row banner-total-content '>
            <div>500+</div>
            <div>Khách Hàng</div>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2'><BsImage size={50} className='' />
          <div className='row banner-total-content '>
            <div>100+</div>
            <div>Dịch Vụ</div>
          </div>
        </div>

      </div>
      <div className='banner-intro'>
        <div className='w-[550px]'>
          <div >
            Dịch Vụ Thuê Homestay
          </div>
        </div>
            <img src={bannerIntro}></img>
      </div>

    </div>
  )
}

export default TrangChu