export const customizableProducts = {

  "mugs": {
    "id": "custom-mug-01",
    "isCustomizable": true, 
    "category": "mugs",
    "productType": "Customizable Mug",
    "name": "Personalized Photo Mug",
    "description": "High-quality ceramic mug with your cherished photos",
    "shortDescription": "Create lasting memories with our premium photo mugs",
    "price": 200,
    "maxUploads": 6,
    "customizationOptions": {
      "allowText": true,
      "maxTextLength": 100,
      "textPlaceholder": "Enter text to appear on your mug...",
      "types": [
        {
          "name": "Plain",
          "id": "plain",
          "price": 200, 
          "previewImages": [
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739428679/1_tstm8y.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739428679/3_dpzekb.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739428679/2_iinjrc.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739428679/7_sc25gi.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739428679/5_i8j4lf.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739428679/4_ehqxwf.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739428679/6_oouvzy.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739429980/8_yfpmm1.png"
          ]
        },
        {
          "name": "Magic",
          "id": "magic",
          "price": 400, 
          "previewImages": [
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435220/m1_u7kkio.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435220/m1_u7kkio.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435218/m2_gynqlg.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435217/m3_enp2dl.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435217/m3_enp2dl.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435220/m1_u7kkio.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435220/m1_u7kkio.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435220/m1_u7kkio.jpg"
          ],
          "description": "Changes color when hot liquid is added"
        },
        {
          "name": "Heart Handle",
          "id": "color",
          "price": 300, 
          "previewImages": [
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435565/h1_hxdz7s.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435565/h1_hxdz7s.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435567/h2_af6nxg.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435569/h3_s5pgrj.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435565/h1_hxdz7s.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435565/h1_hxdz7s.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435567/h2_af6nxg.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739435567/h2_af6nxg.jpg"
          ]
        },
        {
          "name": "Colour Handle",
          "id": "heart",
          "price": 300, 
          "colors": [{ id: "red", name: "Red" },{ id: "orange", name: "Orange" },{ id: "green", name: "Green" }],
          "previewImages": [
            "https://images.zoomin.com/colour_inside_mug/4.0.0/product_images/web/colour-inside-photo-mug-1.jpg",
            "https://m.media-amazon.com/images/I/31A9JXNQT8L.jpg",
            "https://rkcustomisedgifts.com/wp-content/uploads/2023/07/Customized-Orange-Inner-color-mug-3.jpg",
            "https://images-cdn.ubuy.co.in/644abe133dea0460f712e531-homevss-11oz-white-ceramic-sublimation.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp4C6rwuJ9fZ_g9BRh6MWzMqnYvzAmmYZyQ7lNtZxGTIdMMliJ9Zu_Eva-sncVtF8NYl4&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWV_dOf5xBlRVvn34ivhM1VLzT9fMdAhDyEAn1nr0n2kaUwTsMamzwJQzks4EoxHtCq8&usqp=CAU"

          ]
        }
      ]
    },
    "productDetails": {
      "material": "Premium Ceramic",
      "printMethod": "Sublimation Printing",
      "features": [
        "Dishwasher safe",
        "Microwave safe",
        "Fade-resistant printing",
        "High-quality ceramic"
      ]
    },
    "shipping": {
      "processingTime": "3-5 business days",
      "freeShippingThreshold": 1500,
      "shippingNote": "Free shipping on orders over ₹1500"
    },
    "careInstructions": "Hand washing is recommended to preserve print quality. Microwave safe but avoid extended heating periods.",
    "sections": [
      {
        "title": "PRODUCT DETAILS",
        "content": "Our premium ceramic mugs are dishwasher and microwave safe. Photos are printed using high-quality sublimation printing that won't fade or peel."
      },
      {
        "title": "SHIPPING INFORMATION",
        "content": "Please allow 3-5 business days for your custom mug to be printed and shipped."
      },
      {
        "title": "CARE INSTRUCTIONS",
        "content": "Hand washing is recommended to preserve print quality. Microwave safe but avoid extended heating periods."
      }
    ]
  }
  ,



  "polaroid": {
    "id": "custom-polaroid-01",
    "isCustomizable": true, 
    "category": "polaroid",
    "productType": "Customizable Polaroid Prints",
    "name": "Custom Polaroid-Style Photos (Set of 12 photos)",
    "description": "Transform your digital memories into vintage-inspired Polaroid prints",
    "shortDescription": "Classic Polaroid-style prints with your personal touch",
    "price": 200,
    "maxUploads": 12,
    "customizationOptions": {
      "allowText": true,
      "maxTextLength": 50,
      "textPlaceholder": "Add a caption to your memory...",
      "types": [
        {
          "name": "Classic White",
          "id": "classic",
          "previewImages": [
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436963/p8_ahx1ih.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436963/p1_hdrdad.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436964/p7_bo6xnq.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436961/p3_krino8.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436961/p2_riycsj.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436963/p4_ynukcj.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436962/p5_axhtsh.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436961/p3_krino8.jpg"
          ],
          "sizes": [
            {
              "name": "Mini",
              "id": "mini",
              "dimensions": "2.5\" × 3.25\"",
              "price": 200
            },
            {
              "name": "Standard",
              "id": "standard",
              "dimensions": "3.5\" × 4.25\"",
              "price": 250
            },
            {
              "name": "Large",
              "id": "large",
              "dimensions": "4.25\" × 5.5\"",
              "price": 300
            },
          ]
        },
        {
          "name": "Color Frame",
          "id": "color",
          "previewImages": [
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436963/p8_ahx1ih.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436963/p1_hdrdad.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436964/p7_bo6xnq.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436961/p3_krino8.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436961/p2_riycsj.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436963/p4_ynukcj.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436962/p5_axhtsh.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739436961/p3_krino8.jpg"
          ],
          "colors": [{ id: "pink", name: "Pink" },{ id: "blue", name: "Blue" },{ id: "mint", name: "Mint" }],
          "sizes": [
            {
              "name": "Mini",
              "id": "mini",
              "dimensions": "2.5\" × 3.25\"",
              "price": 200
            },
            {
              "name": "Standard",
              "id": "standard",
              "dimensions": "3.5\" × 4.25\"",
              "price": 250
            },
            {
              "name": "Large",
              "id": "large",
              "dimensions": "4.25\" × 5.5\"",
              "price": 300
            },
          ]
        }
      ]
    },
    "productDetails": {
      "material": "Premium Photo Paper",
      "printMethod": "High-Quality Digital Printing",
      "features": [
        "True-to-life colors",
        "Fingerprint resistant coating",
        "Authentic Polaroid-style border",
        "Premium matte finish"
      ]
    },
    "shipping": {
      "processingTime": "2-3 business days",
      "freeShippingThreshold": 1500,
      "shippingNote": "Free shipping on orders over ₹ 1500"
    },
    "careInstructions": "Store in a cool, dry place. Avoid direct sunlight and humidity to preserve print quality.",
    "sections": [
      {
        "title": "PRODUCT DETAILS",
        "content": "Our Polaroid-style prints are created using premium photo paper and advanced digital printing technology for vibrant, long-lasting memories."
      },
      {
        "title": "SHIPPING INFORMATION",
        "content": "Please allow 2-3 business days for your custom prints to be produced and shipped."
      },
      {
        "title": "CARE INSTRUCTIONS",
        "content": "To ensure your prints last a lifetime, store them in a cool, dry place and avoid exposure to direct sunlight."
      }
    ]
  }
  ,

  "wallet": {
    "id": "custom-wallet-card-01",
    "isCustomizable": true, 
    "category": "walletCard",
    "productType": "Customizable Wallet Card",
    "name": "Personalized Metal Wallet Card",
    "description": "Premium metal wallet card with your cherished photos and messages",
    "shortDescription": "Turn memories into a beautiful keepsake you can carry everywhere",
    "price": 150,
    "maxUploads": 2,
    "customizationOptions": {
      "allowText": true,
      "maxTextLength": 150,
      "textPlaceholder": "Add a special message or date to your wallet card...",
      "types": [
        {
          "name": "Shinny Gloss",
          "id": "Shinny Gloss",
          "previewImages": [
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554937/w2_fn1wie.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554936/w3_ainpbf.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554935/w4_esjlru.png",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554935/w7_mtk2i8.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554935/w8_rsuy2b.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554935/w5_dcynmt.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554934/w6_d6zbmi.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739554934/w1_dc2lh8.jpg"
          ],
          "sizes": [
            {
              "name": "Standard",
              "id": "Standard",
              "dimensions": "2.25\" × 3.5\"",
              "price": 150
            }
          ]
        }]
    },
    "productDetails": {
      "material": "Premium Anodized Aluminum",
      "printMethod": "UV Direct Printing",
      "features": [
        "Water-resistant",
        "Scratch-resistant coating",
        "Wallet-friendly thickness",
        "Rounded corners for safety",
        "High-definition photo printing"
      ]
    },
    "shipping": {
      "processingTime": "2-3 business days",
      "freeShippingThreshold": 1500,
      "shippingNote": "Free shipping on orders over ₹ 1500"
    },
    "careInstructions": "Clean with soft, dry cloth. Avoid exposure to harsh chemicals.",
    "sections": [
      {
        "title": "PRODUCT DETAILS",
        "content": "Our metal wallet cards are crafted from premium anodized aluminum with UV-printed photos for exceptional durability and image quality. Each card features rounded corners and is designed to fit perfectly in your wallet."
      },
      {
        "title": "SHIPPING INFORMATION",
        "content": "Please allow 2-3 business days for your custom wallet card to be produced and shipped."
      },
      {
        "title": "CARE INSTRUCTIONS",
        "content": "To maintain the quality of your wallet card, clean with a soft, dry cloth and avoid exposure to harsh chemicals. The UV-printed surface is designed to be durable but should be handled with care to ensure longevity."
      }
    ]
  }
  ,

  "tshirt": {
    "id": "custom-tshirt-01",
    "isCustomizable": true, 
    "category": "tshirt",
    "productType": "Customizable T-Shirt",
    "name": "Custom Photo T-Shirt",
    "description": "High-quality cotton t-shirt with your favorite photos and designs",
    "shortDescription": "Create your own unique style with custom printed t-shirts",
    "price": 300,
    "maxUploads": 4,
    "customizationOptions": {
      "allowText": true,
      "maxTextLength": 200,
      "textPlaceholder": "Add your custom text or message...",
      "types": [
        {
          "name": "Classic Crew Neck",
          "id": "crew",
          "previewImages": [
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739555466/t5_kvvsra.jpg",
            
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739555464/t7_kwkzlo.jpg",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739555467/t6_jsu3ww.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739555466/t3_q8d5oh.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739555466/t2_uhlkbx.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739555464/t4_dkprz5.webp",
            "https://res.cloudinary.com/dg3ftdduj/image/upload/v1739555464/t8_pvfo3m.webp"
          ],
          "colors": [
            {
              "name": "White",
              "id": "white",
              "hex": "#FFFFFF"
            }
          ],
          "sizes": [
            {
              "name": "Small",
              "id": "S",
              "dimensions": "Chest 34\"-36\"",
              "price": 300
            },
            {
              "name": "Medium",
              "id": "M",
              "dimensions": "Chest 38\"-40\"",
              "price": 300
            },
            {
              "name": "Large",
              "id": "L",
              "dimensions": "Chest 42\"-44\"",
              "price": 300
            },
            {
              "name": "X-Large",
              "id": "XL",
              "dimensions": "Chest 46\"-48\"",
              "price": 300
            },
            {
              "name": "2X-Large",
              "id": "2XL",
              "dimensions": "Chest 50\"-52\"",
              "price": 300
            }
          ]
        }
      ],
      "printLocations": [
        {
          "name": "Front Center",
          "id": "frontCenter",
          "maxWidth": "12 inches",
          "maxHeight": "16 inches"
        },
        {
          "name": "Back Center",
          "id": "backCenter",
          "maxWidth": "12 inches",
          "maxHeight": "16 inches"
        },
        {
          "name": "Left Chest",
          "id": "leftChest",
          "maxWidth": "4 inches",
          "maxHeight": "4 inches"
        },
        {
          "name": "Right Chest",
          "id": "rightChest",
          "maxWidth": "4 inches",
          "maxHeight": "4 inches"
        }
      ]
    },
    "productDetails": {
      "material": "100% Premium Cotton",
      "printMethod": "DTG (Direct to Garment)/Sublimation Printing",
      "features": [
        "Premium cotton fabric",
        "Breathable and comfortable",
        "Pre-shrunk material",
        "Reinforced double-stitching",
        "Tagless neck label",
        "High-quality DTG / Sublimation printing"
      ],
      "weightInOz": 6.1,
      "fabricWeight": "160 GSM"
    },
    "shipping": {
      "processingTime": "3-5 business days",
      "freeShippingThreshold": 1500,
      "shippingNote": "Free shipping on orders over ₹1500",
      
    },
    "careInstructions": "Machine wash cold, inside-out. Tumble dry low. Do not iron directly on printed design.",
    "sections": [
      {
        "title": "PRODUCT DETAILS",
        "content": "Our premium cotton t-shirts are printed using state-of-the-art DTG / Sublimation printing technology for vibrant, long-lasting designs. Each shirt features reinforced double-stitching and a comfortable tagless neck label."
      },
      {
        "title": "PRINTING INFORMATION",
        "content": "We use Direct to Garment (DTG) / Sublimation printing for exceptional detail and color vibrancy. Your design is printed directly into the fabric for maximum durability and a soft feel."
      },
      {
        "title": "SHIPPING INFORMATION",
        "content": "Please allow 3-5 business days for your custom t-shirt to be printed and shipped. Bulk orders may require additional processing time."
      },
      {
        "title": "CARE INSTRUCTIONS",
        "content": "To ensure your custom t-shirt stays looking great, machine wash cold with the garment turned inside-out. Tumble dry on low heat. Do not iron directly over the printed design."
      },
      {
        "title": "SIZE GUIDE",
        "content": "Please refer to our size chart to ensure the perfect fit. Measurements are provided in inches and refer to chest circumference. When in doubt, we recommend ordering one size up."
      }
    ]
  }
  ,
  
  
    "cushion": {
      "id": "custom-cushion-01",
      "isCustomizable": true,
      "category": "cushion",
      "productType": "Customized Cushion",
      "name": "Personalized Photo Cushion",
      "description": "A soft and cozy cushion featuring your favorite photos, perfect for adding a personal touch to your home",
      "shortDescription": "Turn your memories into a comfortable and stylish cushion",
      "price": 600,
      "maxUploads": 4,
      "customizationOptions": {
        "allowText": true,
        "maxTextLength": 50,
        "textPlaceholder": "Add a special message or caption...",
        "types": [
          {
            "name": "Standard",
            "id": "standard",
            "price": 600,
            "previewImages": [
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741621855/Happy-anniversary-cushion_bdkj75.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741619958/WhatsApp_Image_2025-03-09_at_23.40.46_fvf4vu.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741621983/Cushion-Printing_qfqjxw.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741621986/photo-cushion_m1kqlh.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741621987/photo-cushion-1_prlpoa.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741622142/36_34_44243_wdct1p.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741622144/89315_gkx8tg.avif",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741622254/personalized-cushions-set-for-anniversary_1_qhfw37.jpg"
            ],
            "sizes": [
              {
                "name": "16x16-inch",
                "id": "16x16-inch",
                "dimensions": "16\" × 16\"",
                "price": 600
              }],
          },
          {
            "name": "Fur Heart",
            "id": "fur-heart",
           
            "previewImages": [
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741623628/customized-heart-shape-fur-pillow-1000x1000_uyweg7.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741623638/Blooming-Prints-Red-Heart-Cushion-scaled-1_rc3she.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741623630/BPHFRC-2_h7sic1.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741623624/fur-heart-pillow-1000x1000_oktm3f.jpg"
            ],
            "sizes": [
              {
                "name": "14x16-inch",
                "id": "14x16-inch",
                "dimensions": "14\" × 16\"",
                "price": 400
              }],
            "description": "A luxurious fur heart-shaped cushion, perfect for adding a touch of elegance to your home"
          }
        ]
      },
      "productDetails": {
        "material": "Premium Polyester",
        "features": [
          "Soft and durable fabric",
          "High-quality digital printing",
          "Removable and washable cover",
          "Lightweight and comfortable",
          "Perfect for sofas, beds, or chairs"
        ]
      },
      "shipping": {
        "processingTime": "5-7 business days",
        "freeShippingThreshold": 1500,
        "shippingNote": "Free shipping on orders over ₹ 1500"
      },
      "careInstructions": "Machine washable on gentle cycle. Tumble dry on low heat.",
      "sections": [
        {
          "title": "PRODUCT DETAILS",
          "content": "Our Customized Cushion is made from premium polyester fabric and features high-quality digital printing. It's perfect for adding a personal touch to your home decor."
        },
        {
          "title": "SHIPPING INFORMATION",
          "content": "Please allow 5-7 business days for your custom cushion to be prepared and shipped."
        },
        {
          "title": "CARE INSTRUCTIONS",
          "content": "Machine washable on gentle cycle. Tumble dry on low heat to maintain the cushion's quality."
        }
      ]
    }
  ,
  
    "frames": {
      "id": "custom-frame-01",
      "isCustomizable": true,
      "category": "frames",
      "productType": "Customized Frame",
      "name": "Personalized Photo Frame",
      "description": "High-quality frames to showcase your favorite photos, available in multiple colors and sizes",
      "shortDescription": "Display your cherished memories in style with our premium frames",
      "price": 150,
      "maxUploads": 12,
      "customizationOptions": {
        "allowText": true,
        "maxTextLength": 50,
        "textPlaceholder": "Add a special message or caption...",
        "types": [
          {
            "name": "White",
            "id": "white",
            "previewImages": [
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624214/wp4dzgdsothxjxnmltxh.avif",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624212/1c_0164d0b8-a3fc-4ecf-8def-c2fa791307f7_mmod0k.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624217/1_F_e16faf3b-0c0b-429a-a233-6d0451f58262.jppg_sa44lw.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624210/51jST1pqkGL._AC_UF894_1000_QL80__sfsyr8.jpg"
            ],
            "sizes": [
              {
                "name": "5x7",
                "id": "5x7",
                "dimensions": "5\" × 7\"",
                "price": 150
              },
              {
                "name": "8x12",
                "id": "8x12",
                "dimensions": "8\" × 12\"",
                "price": 400
              },
              {
                "name": "12x18",
                "id": "12x18",
                "dimensions": "12\" × 18\"",
                "price": 550
              },
              {
                "name": "18x24",
                "id": "18x24",
                "dimensions": "18\" × 24\"",
                "price": 1100
              },
              {
                "name": "24x36",
                "id": "24x36",
                "dimensions": "24\" × 36\"",
                "price": 1600
              }
            ]
          },
          {
            "name": "Black",
            "id": "black",
            "previewImages": [
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624430/Black-3-1-Frame_crkgjs.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624428/2c_242855b4-9861-4ec9-a6f0-a52f6567473e_fjpuxt.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624432/8X10-Bk_e25a3e01-6c06-4596-98ab-3887b2f60c45_700x700_eq95x0.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624435/81AKSC8A5xL_grqmgl.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624437/71O-FzCZgOL._AC_UF894_1000_QL80__uxugw7.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624537/20230717_162536758207_289627_Matt-Finish-Photo-Frame_as9olt.jpg"
            ],
            "sizes": [
              {
                "name": "5x7",
                "id": "5x7",
                "dimensions": "5\" × 7\"",
                "price": 150
              },
              {
                "name": "8x12",
                "id": "8x12",
                "dimensions": "8\" × 12\"",
                "price": 400
              },
              {
                "name": "12x18",
                "id": "12x18",
                "dimensions": "12\" × 18\"",
                "price": 550
              },
              {
                "name": "18x24",
                "id": "18x24",
                "dimensions": "18\" × 24\"",
                "price": 1100
              },
              {
                "name": "24x36",
                "id": "24x36",
                "dimensions": "24\" × 36\"",
                "price": 1600
              }
            ]
          },
          {
            "name": "Brown",
            "id": "brown",
            "previewImages": [
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624802/Frames-4x6-8_b6eo7u.webp",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624798/-473Wx593H-462812090-brown-MODEL_kcfd0x.avif",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624792/1_itlgpp.jpg",
              "https://res.cloudinary.com/dg3ftdduj/image/upload/v1741624789/brown-with-beading_lacgdx.webp"
            ],
           "sizes": [
              {
                "name": "5x7",
                "id": "5x7",
                "dimensions": "5\" × 7\"",
                "price": 150
              },
              {
                "name": "8x12",
                "id": "8x12",
                "dimensions": "8\" × 12\"",
                "price": 400
              },
              {
                "name": "12x18",
                "id": "12x18",
                "dimensions": "12\" × 18\"",
                "price": 550
              },
              {
                "name": "18x24",
                "id": "18x24",
                "dimensions": "18\" × 24\"",
                "price": 1100
              },
              {
                "name": "24x36",
                "id": "24x36",
                "dimensions": "24\" × 36\"",
                "price": 1600
              }
            ]
          }
        ]
      },
      "productDetails": {
        "material": "Premium Wood",
        "features": [
          "High-quality wood construction",
          "Sleek and modern design",
          "Durable and long-lasting",
          "Easy to hang or display",
          "Available in multiple colors and sizes"
        ]
      },
      "shipping": {
        "processingTime": "5-7 business days",
        "freeShippingThreshold": 1500,
        "shippingNote": "Free shipping on orders over ₹ 1500"
      },
      "careInstructions": "Clean with a soft, dry cloth. Avoid using harsh chemicals or abrasive materials.",
      "sections": [
        {
          "title": "PRODUCT DETAILS",
          "content": "Our premium frames are made from high-quality wood and are available in multiple colors and sizes. They are perfect for showcasing your cherished memories in a modern and stylish way."
        },
        {
          "title": "SHIPPING INFORMATION",
          "content": "Please allow 5-7 business days for your custom frame to be prepared and shipped."
        },
        {
          "title": "CARE INSTRUCTIONS",
          "content": "Clean with a soft, dry cloth. Avoid using harsh chemicals or abrasive materials to maintain the frame's finish."
        }
      ]
    }
   



};

// Helper function to get product by category
export const getProductByCategory = (category) => {
  return customizableProducts[category];
};

// Helper function to validate if category exists
export const isValidCategory = (category) => {
  return category in customizableProducts;
};