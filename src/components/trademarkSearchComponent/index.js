import React, { memo, useEffect, useState } from "react";
import { TreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "../trademarkSearchComponent/trademarkSearchComponent.css";
import Radio from "@mui/material/Radio";
import MultiSelectCheckBox from "../common/multiSelectCheckBox";
import apiRequest from "../api/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvailableJurisdictionsComponent from "../availableJurisdictionsComponent";
const globalData = {
  territories: [
    {
      code: "ASI",
      description: "Asia",
      level: 1,
      children: [
        { code: "AF", description: "Afghanistan", level: 2, children: [] },
        { code: "AM", description: "Armenia", level: 2, children: [] },
        { code: "AZ", description: "Azerbaijan", level: 2, children: [] },
        { code: "BH", description: "Bahrain", level: 2, children: [] },
        { code: "BD", description: "Bangladesh", level: 2, children: [] },
        { code: "BT", description: "Bhutan", level: 2, children: [] },
        {
          code: "IO",
          description: "British Indian Ocean Territory",
          level: 2,
          children: [],
        },
        {
          code: "BN",
          description: "Brunei Darussalam",
          level: 2,
          children: [],
        },
        { code: "KH", description: "Cambodia", level: 2, children: [] },
        { code: "CN", description: "China", level: 2, children: [] },
        { code: "CX", description: "Christmas Island", level: 2, children: [] },
        {
          code: "CC",
          description: "Cocos (Keeling) Islands",
          level: 2,
          children: [],
        },
        { code: "HK", description: "Hong Kong", level: 2, children: [] },
        { code: "IN", description: "India", level: 2, children: [] },
        { code: "ID", description: "Indonesia", level: 2, children: [] },
        { code: "IR", description: "Iran", level: 2, children: [] },
        { code: "IQ", description: "Iraq", level: 2, children: [] },
        { code: "IL", description: "Israel", level: 2, children: [] },
        { code: "JP", description: "Japan", level: 2, children: [] },
        { code: "JO", description: "Jordan", level: 2, children: [] },
        { code: "KZ", description: "Kazakhstan", level: 2, children: [] },
        { code: "KP", description: "North Korea", level: 2, children: [] },
        { code: "KW", description: "Kuwait", level: 2, children: [] },
        { code: "KG", description: "Kyrgyzstan", level: 2, children: [] },
        { code: "LA", description: "Laos", level: 2, children: [] },
        { code: "LB", description: "Lebanon", level: 2, children: [] },
        { code: "MO", description: "Macao", level: 2, children: [] },
        { code: "MY", description: "Malaysia", level: 2, children: [] },
        { code: "MV", description: "Maldives", level: 2, children: [] },
        { code: "MN", description: "Mongolia", level: 2, children: [] },
        { code: "MM", description: "Myanmar", level: 2, children: [] },
        { code: "NP", description: "Nepal", level: 2, children: [] },
        { code: "OM", description: "Oman", level: 2, children: [] },
        { code: "PK", description: "Pakistan", level: 2, children: [] },
        { code: "PS", description: "PS", level: 2, children: [] },
        { code: "PH", description: "Philippines", level: 2, children: [] },
        { code: "QA", description: "Qatar", level: 2, children: [] },
        {
          code: "KR",
          description: "Republic of Korea",
          level: 2,
          children: [],
        },
        { code: "SA", description: "Saudi Arabia", level: 2, children: [] },
        { code: "SG", description: "Singapore", level: 2, children: [] },
        { code: "LK", description: "Sri Lanka", level: 2, children: [] },
        { code: "SY", description: "Syria", level: 2, children: [] },
        {
          code: "TW",
          description: "Taiwan, Province of China",
          level: 2,
          children: [],
        },
        { code: "TJ", description: "Tajikistan", level: 2, children: [] },
        { code: "TH", description: "Thailand", level: 2, children: [] },
        { code: "TL", description: "Timor-Leste", level: 2, children: [] },
        { code: "TM", description: "Turkmenistan", level: 2, children: [] },
        { code: "TR", description: "Türkiye", level: 2, children: [] },
        {
          code: "AE",
          description: "United Arab Emirates",
          level: 2,
          children: [],
        },
        { code: "UZ", description: "Uzbekistan", level: 2, children: [] },
        { code: "VN", description: "Vietnam", level: 2, children: [] },
        { code: "YE", description: "Yemen", level: 2, children: [] },
      ],
    },
    {
      code: "AUS",
      description: "Oceania",
      level: 1,
      children: [
        { code: "AS", description: "American Samoa", level: 2, children: [] },
        { code: "AU", description: "Australia", level: 2, children: [] },
        { code: "BV", description: "Bouvet Island", level: 2, children: [] },
        { code: "CK", description: "Cook Islands", level: 2, children: [] },
        { code: "FJ", description: "Fiji", level: 2, children: [] },
        { code: "PF", description: "French Polynesia", level: 2, children: [] },
        { code: "GU", description: "Guam", level: 2, children: [] },
        { code: "KI", description: "Kiribati", level: 2, children: [] },
        { code: "MH", description: "Marshall Islands", level: 2, children: [] },
        { code: "FM", description: "Micronesia", level: 2, children: [] },
        { code: "NR", description: "Nauru", level: 2, children: [] },
        { code: "NC", description: "New Caledonia", level: 2, children: [] },
        { code: "NZ", description: "New Zealand", level: 2, children: [] },
        { code: "NU", description: "Niue", level: 2, children: [] },
        { code: "NF", description: "Norfolk Island", level: 2, children: [] },
        { code: "PW", description: "Palau", level: 2, children: [] },
        { code: "PG", description: "Papua New Guinea", level: 2, children: [] },
        { code: "PN", description: "Pitcairn Islands", level: 2, children: [] },
        { code: "WS", description: "Samoa", level: 2, children: [] },
        { code: "SB", description: "Solomon Islands", level: 2, children: [] },
        { code: "TK", description: "Tokelau", level: 2, children: [] },
        { code: "TV", description: "Tuvalu", level: 2, children: [] },
        {
          code: "UM",
          description: "United States Minor Outlying Islands",
          level: 2,
          children: [],
        },
        { code: "VU", description: "Vanuatu", level: 2, children: [] },
        {
          code: "WF",
          description: "Wallis and Futuna",
          level: 2,
          children: [],
        },
      ],
    },
    {
      code: "AFR",
      description: "Africa",
      level: 1,
      children: [
        { code: "DZ", description: "Algeria", level: 2, children: [] },
        { code: "AO", description: "Angola", level: 2, children: [] },
        { code: "BJ", description: "Benin", level: 2, children: [] },
        { code: "BW", description: "Botswana", level: 2, children: [] },
        { code: "BF", description: "Burkina Faso", level: 2, children: [] },
        { code: "BI", description: "Burundi", level: 2, children: [] },
        { code: "CM", description: "Cameroon", level: 2, children: [] },
        { code: "CV", description: "Cabo Verde", level: 2, children: [] },
        {
          code: "CF",
          description: "Central African Republic",
          level: 2,
          children: [],
        },
        { code: "TD", description: "Chad", level: 2, children: [] },
        { code: "KM", description: "Comoros", level: 2, children: [] },
        { code: "CG", description: "Congo", level: 2, children: [] },
        { code: "CI", description: "Côte d’Ivoire", level: 2, children: [] },
        {
          code: "CD",
          description: "Democratic Republic of Congo",
          level: 2,
          children: [],
        },
        { code: "DJ", description: "Djibouti", level: 2, children: [] },
        { code: "EG", description: "Egypt", level: 2, children: [] },
        {
          code: "GQ",
          description: "Equatorial Guinea",
          level: 2,
          children: [],
        },
        { code: "ER", description: "Eritrea", level: 2, children: [] },
        { code: "ET", description: "Ethiopia", level: 2, children: [] },
        { code: "GA", description: "Gabon", level: 2, children: [] },
        { code: "GM", description: "Gambia", level: 2, children: [] },
        { code: "GH", description: "Ghana", level: 2, children: [] },
        { code: "GN", description: "Guinea", level: 2, children: [] },
        { code: "GW", description: "Guinea-Bissau", level: 2, children: [] },
        { code: "KE", description: "Kenya", level: 2, children: [] },
        { code: "LS", description: "Lesotho", level: 2, children: [] },
        { code: "LR", description: "Liberia", level: 2, children: [] },
        { code: "LY", description: "Libya", level: 2, children: [] },
        { code: "MG", description: "Madagascar", level: 2, children: [] },
        { code: "MW", description: "Malawi", level: 2, children: [] },
        { code: "ML", description: "Mali", level: 2, children: [] },
        { code: "MR", description: "Mauritania", level: 2, children: [] },
        { code: "MU", description: "Mauritius", level: 2, children: [] },
        { code: "YT", description: "Mayotte", level: 2, children: [] },
        { code: "MA", description: "Morocco", level: 2, children: [] },
        { code: "MZ", description: "Mozambique", level: 2, children: [] },
        { code: "NA", description: "Namibia", level: 2, children: [] },
        { code: "NE", description: "Niger", level: 2, children: [] },
        { code: "NG", description: "Nigeria", level: 2, children: [] },
        { code: "OA", description: "OAPI", level: 2, children: [] },
        { code: "RE", description: "Réunion", level: 2, children: [] },
        { code: "RW", description: "Rwanda", level: 2, children: [] },
        {
          code: "ST",
          description: "Sao Tome and Principe",
          level: 2,
          children: [],
        },
        { code: "SN", description: "Senegal", level: 2, children: [] },
        { code: "SC", description: "Seychelles", level: 2, children: [] },
        { code: "SL", description: "Sierra Leone", level: 2, children: [] },
        { code: "SO", description: "Somalia", level: 2, children: [] },
        { code: "ZA", description: "South Africa", level: 2, children: [] },
        { code: "SS", description: "South Sudan", level: 2, children: [] },
        { code: "SD", description: "Sudan", level: 2, children: [] },
        { code: "SZ", description: "Eswatini", level: 2, children: [] },
        { code: "TZ", description: "Tanzania", level: 2, children: [] },
        { code: "TG", description: "Togo", level: 2, children: [] },
        { code: "TO", description: "Tonga", level: 2, children: [] },
        {
          code: "TT",
          description: "Trinidad and Tobago",
          level: 2,
          children: [],
        },
        { code: "TN", description: "Tunisia", level: 2, children: [] },
        { code: "UG", description: "Uganda", level: 2, children: [] },
        { code: "EH", description: "Western Sahara", level: 2, children: [] },
        { code: "ZM", description: "Zambia", level: 2, children: [] },
        { code: "ZW", description: "Zimbabwe", level: 2, children: [] },
      ],
    },
    {
      code: "AMC",
      description: "America",
      level: 1,
      children: [
        { code: "AI", description: "Anguilla", level: 2, children: [] },
        { code: "AQ", description: "Antarctica", level: 2, children: [] },
        {
          code: "AG",
          description: "Antigua and Barbuda",
          level: 2,
          children: [],
        },
        { code: "AR", description: "Argentina", level: 2, children: [] },
        { code: "AW", description: "Aruba", level: 2, children: [] },
        { code: "BS", description: "Bahamas", level: 2, children: [] },
        { code: "BB", description: "Barbados", level: 2, children: [] },
        { code: "BZ", description: "Belize", level: 2, children: [] },
        { code: "BM", description: "Bermuda", level: 2, children: [] },
        { code: "BO", description: "Bolivia", level: 2, children: [] },
        { code: "BR", description: "Brazil", level: 2, children: [] },
        { code: "CA", description: "Canada", level: 2, children: [] },
        { code: "KY", description: "Cayman Islands", level: 2, children: [] },
        { code: "CL", description: "Chile", level: 2, children: [] },
        { code: "CO", description: "Colombia", level: 2, children: [] },
        { code: "CR", description: "Costa Rica", level: 2, children: [] },
        { code: "CU", description: "Cuba", level: 2, children: [] },
        { code: "DM", description: "Dominica", level: 2, children: [] },
        {
          code: "DO",
          description: "Dominican Republic",
          level: 2,
          children: [],
        },
        { code: "EC", description: "Ecuador", level: 2, children: [] },
        { code: "SV", description: "El Salvador", level: 2, children: [] },
        { code: "FK", description: "Falkland Islands", level: 2, children: [] },
        { code: "GF", description: "French Guiana", level: 2, children: [] },
        {
          code: "TF",
          description: "French Southern and Antarctic Lands",
          level: 2,
          children: [],
        },
        { code: "GL", description: "Greenland", level: 2, children: [] },
        { code: "GD", description: "Grenada", level: 2, children: [] },
        { code: "GP", description: "Guadeloupe", level: 2, children: [] },
        { code: "GT", description: "Guatemala", level: 2, children: [] },
        { code: "GY", description: "Guyana", level: 2, children: [] },
        { code: "HT", description: "Haiti", level: 2, children: [] },
        {
          code: "HM",
          description: "Heard Island and McDonald Islands",
          level: 2,
          children: [],
        },
        { code: "HN", description: "Honduras", level: 2, children: [] },
        { code: "JM", description: "Jamaica", level: 2, children: [] },
        { code: "MQ", description: "Martinique", level: 2, children: [] },
        { code: "MX", description: "Mexico", level: 2, children: [] },
        { code: "MS", description: "Montserrat", level: 2, children: [] },
        { code: "NI", description: "Nicaragua", level: 2, children: [] },
        {
          code: "MP",
          description: "Northern Mariana Islands",
          level: 2,
          children: [],
        },
        { code: "PA", description: "Panama", level: 2, children: [] },
        { code: "PY", description: "Paraguay", level: 2, children: [] },
        { code: "PE", description: "Peru", level: 2, children: [] },
        { code: "BL", description: "Saint Barthélemy", level: 2, children: [] },
        {
          code: "KN",
          description: "Saint Kitts and Nevis",
          level: 2,
          children: [],
        },
        { code: "LC", description: "Saint Lucia", level: 2, children: [] },
        { code: "MF", description: "Saint Martin", level: 2, children: [] },
        {
          code: "PM",
          description: "Saint Pierre and Miquelon",
          level: 2,
          children: [],
        },
        {
          code: "VC",
          description: "Saint Vincent and the Grenadines",
          level: 2,
          children: [],
        },
        {
          code: "GS",
          description: "South Georgia and the South Sandwich Islands",
          level: 2,
          children: [],
        },
        { code: "SR", description: "Suriname", level: 2, children: [] },
        {
          code: "TC",
          description: "Turks and Caicos Islands",
          level: 2,
          children: [],
        },
        { code: "US", description: "United States", level: 2, children: [] },
        { code: "UY", description: "Uruguay", level: 2, children: [] },
        { code: "VE", description: "Venezuela", level: 2, children: [] },
        {
          code: "VG",
          description: "British Virgin Islands",
          level: 2,
          children: [],
        },
      ],
    },
    {
      code: "EUR",
      description: "Europe",
      level: 1,
      children: [
        {
          code: "EU",
          description: "European Union",
          level: 2,
          children: [
            { code: "AT", description: "Austria", level: 3, children: [] },
            { code: "BE", description: "Belgium", level: 3, children: [] },
            { code: "BG", description: "Bulgaria", level: 3, children: [] },
            { code: "HR", description: "Croatia", level: 3, children: [] },
            { code: "CY", description: "Cyprus", level: 3, children: [] },
            {
              code: "CZ",
              description: "Czech Republic",
              level: 3,
              children: [],
            },
            { code: "DK", description: "Denmark", level: 3, children: [] },
            { code: "EE", description: "Estonia", level: 3, children: [] },
            { code: "FI", description: "Finland", level: 3, children: [] },
            { code: "FR", description: "France", level: 3, children: [] },
            { code: "DE", description: "Germany", level: 3, children: [] },
            { code: "GR", description: "Greece", level: 3, children: [] },
            { code: "HU", description: "Hungary", level: 3, children: [] },
            { code: "IE", description: "Ireland", level: 3, children: [] },
            { code: "IT", description: "Italy", level: 3, children: [] },
            { code: "LV", description: "Latvia", level: 3, children: [] },
            { code: "LT", description: "Lithuania", level: 3, children: [] },
            { code: "LU", description: "Luxembourg", level: 3, children: [] },
            { code: "MT", description: "Malta", level: 3, children: [] },
            { code: "NL", description: "Netherlands", level: 3, children: [] },
            { code: "PL", description: "Poland", level: 3, children: [] },
            { code: "PT", description: "Portugal", level: 3, children: [] },
            { code: "RO", description: "Romania", level: 3, children: [] },
            { code: "SK", description: "Slovakia", level: 3, children: [] },
            { code: "SI", description: "Slovenia", level: 3, children: [] },
            { code: "ES", description: "Spain", level: 3, children: [] },
            { code: "SE", description: "Sweden", level: 3, children: [] },
          ],
        },
        {
          code: "NEU",
          description: "Non-European Union",
          level: 2,
          children: [
            {
              code: "AX",
              description: "Åland Islands",
              level: 3,
              children: [],
            },
            { code: "AL", description: "Albania", level: 3, children: [] },
            { code: "AD", description: "Andorra", level: 3, children: [] },
            { code: "BY", description: "Belarus", level: 3, children: [] },
            {
              code: "BQ",
              description: "Bonaire, Sint Eustatius and Saba",
              level: 3,
              children: [],
            },
            {
              code: "BA",
              description: "Bosnia and Herzegovina",
              level: 3,
              children: [],
            },
            { code: "CW", description: "Curaçao", level: 3, children: [] },
            { code: "FO", description: "Faroes", level: 3, children: [] },
            { code: "GE", description: "Georgia", level: 3, children: [] },
            { code: "GI", description: "Gibraltar", level: 3, children: [] },
            { code: "GG", description: "Guernsey", level: 3, children: [] },
            { code: "IS", description: "Iceland", level: 3, children: [] },
            { code: "IM", description: "Isle of Man", level: 3, children: [] },
            { code: "JE", description: "Jersey", level: 3, children: [] },
            {
              code: "LI",
              description: "Liechtenstein",
              level: 3,
              children: [],
            },
            { code: "MD", description: "Moldova", level: 3, children: [] },
            { code: "MC", description: "Monaco", level: 3, children: [] },
            { code: "ME", description: "Montenegro", level: 3, children: [] },
            {
              code: "MK",
              description: "North Macedonia",
              level: 3,
              children: [],
            },
            { code: "NO", description: "Norway", level: 3, children: [] },
            {
              code: "RU",
              description: "Russian Federation",
              level: 3,
              children: [],
            },
            {
              code: "SH",
              description: "Saint Helena, Ascension and Tristan da Cunha",
              level: 3,
              children: [],
            },
            { code: "SM", description: "San Marino", level: 3, children: [] },
            { code: "RS", description: "Serbia", level: 3, children: [] },
            { code: "SX", description: "Sint Maarten", level: 3, children: [] },
            {
              code: "SJ",
              description: "Svalbard and Jan Mayen",
              level: 3,
              children: [],
            },
            { code: "CH", description: "Switzerland", level: 3, children: [] },
            { code: "UA", description: "Ukraine", level: 3, children: [] },
            {
              code: "GB",
              description: "United Kingdom",
              level: 3,
              children: [],
            },
            {
              code: "VA",
              description: "Vatican City State",
              level: 3,
              children: [],
            },
          ],
        },
      ],
    },
  ],
  classes: [
    {
      id: 1,
      description:
        "Chemicals for use in industry, science and photography, as well as in agriculture, horticulture and forestry; Unprocessed artificial resins, unprocessed plastics; Fire extinguishing and fire prevention compositions; Tempering and soldering preparations; Substances for tanning animal skins and hides; Adhesives for use in industry; Putties and other paste fillers; Compost, manures, fertilizers; Biological preparations for use in industry and science",
    },
    {
      id: 2,
      description:
        "Paints, varnishes, lacquers; Preservatives against rust and against deterioration of wood; Colorants, dyes; Inks for printing, marking and engraving; Raw natural resins; Metals in foil and powder form for use in painting, decorating, printing and art",
    },
    {
      id: 3,
      description:
        "Non-medicated cosmetics and toiletry preparations; Non-medicated dentifrices; Perfumery, essential oils; Bleaching preparations and other substances for laundry use; Cleaning, polishing, scouring and abrasive preparations",
    },
    {
      id: 4,
      description:
        "Industrial oils and greases, wax; Lubricants; Dust absorbing, wetting and binding compositions; Fuels and illuminants; Candles and wicks for lighting",
    },
    {
      id: 5,
      description:
        "Pharmaceuticals, medical and veterinary preparations; Sanitary preparations for medical purposes; Dietetic food and substances adapted for medical or veterinary use, food for babies; Dietary supplements for human beings and animals; Plasters, materials for dressings; Material for stopping teeth, dental wax; Disinfectants; Preparations for destroying vermin; Fungicides, herbicides",
    },
    {
      id: 6,
      description:
        "Common metals and their alloys, ores; Metal materials for building and construction; Transportable buildings of metal; Non-electric cables and wires of common metal; Small items of metal hardware; Metal containers for storage or transport; Safes",
    },
    {
      id: 7,
      description:
        "Machines, machine tools, power-operated tools; Motors and engines, except for land vehicles; Machine coupling and transmission components, except for land vehicles; Agricultural implements, other than hand-operated hand tools; Incubators for eggs; Automatic vending machines",
    },
    {
      id: 8,
      description:
        "Hand tools and implements, hand-operated; Cutlery; Side arms, except firearms; Razors",
    },
    {
      id: 9,
      description:
        "Scientific, research, navigation, surveying, photographic, cinematographic, audiovisual, optical, weighing, measuring, signalling, detecting, testing, inspecting, life-saving and teaching apparatus and instruments; Apparatus and instruments for conducting, switching, transforming, accumulating, regulating or controlling the distribution or use of electricity; Apparatus and instruments for recording, transmitting, reproducing or processing sound, images or data; Recorded and downloadable media, computer software, blank digital or analogue recording and storage media; Mechanisms for coin-operated apparatus; Cash registers, calculating devices; Computers and computer peripheral devices; Diving suits, divers' masks, ear plugs for divers, nose clips for divers and swimmers, gloves for divers, breathing apparatus for underwater swimming; Fire-extinguishing apparatus",
    },
    {
      id: 10,
      description:
        "Surgical, medical, dental and veterinary apparatus and instruments; Artificial limbs, eyes and teeth; Orthopaedic articles; Suture materials; Therapeutic and assistive devices adapted for persons with disabilities; Massage apparatus; Apparatus, devices and articles for nursing infants; Sexual activity apparatus, devices and articles",
    },
    {
      id: 11,
      description:
        "Apparatus and installations for lighting, heating, cooling, steam generating, cooking, drying, ventilating, water supply and sanitary purposes",
    },
    {
      id: 12,
      description: "Vehicles; Apparatus for locomotion by land, air or water",
    },
    {
      id: 13,
      description:
        "Firearms; Ammunition and projectiles; Explosives; Fireworks",
    },
    {
      id: 14,
      description:
        "Precious metals and their alloys; Jewellery, precious and semi-precious stones; Horological and chronometric instruments",
    },
    {
      id: 15,
      description:
        "Musical instruments; Music stands and stands for musical instruments; Conductors' batons",
    },
    {
      id: 16,
      description:
        "Paper and cardboard; Printed matter; Bookbinding material; Photographs; Stationery and office requisites, except furniture; Adhesives for stationery or household purposes; Drawing materials and materials for artists; Paintbrushes; Instructional and teaching materials; Plastic sheets, films and bags for wrapping and packaging; Printers' type, printing blocks",
    },
    {
      id: 17,
      description:
        "Unprocessed and semi-processed rubber, gutta-percha, gum, asbestos, mica and substitutes for all these materials; Plastics and resins in extruded form for use in manufacture; Packing, stopping and insulating materials; Flexible pipes, tubes and hoses, not of metal",
    },
    {
      id: 18,
      description:
        "Leather and imitations of leather; Animal skins and hides; Luggage and carrying bags; Umbrellas and parasols; Walking sticks; Whips, harness and saddlery; Collars, leashes and clothing for animals",
    },
    {
      id: 19,
      description:
        "Materials, not of metal, for building and construction; Rigid pipes, not of metal, for building; Asphalt, pitch, tar and bitumen; Transportable buildings, not of metal; Monuments, not of metal",
    },
    {
      id: 20,
      description:
        "Furniture, mirrors, picture frames; Containers, not of metal, for storage or transport; Unworked or semi-worked bone, horn, whalebone or mother-of-pearl; Shells; Meerschaum; Yellow amber",
    },
    {
      id: 21,
      description:
        "Household or kitchen utensils and containers; Cookware and tableware, except forks, knives and spoons; Combs and sponges; Brushes, except paintbrushes; Brush-making materials; Articles for cleaning purposes; Unworked or semi-worked glass, except building glass; Glassware, porcelain and earthenware",
    },
    {
      id: 22,
      description:
        "Ropes and string; Nets; Tents and tarpaulins; Awnings of textile or synthetic materials; Sails; Sacks for the transport and storage of materials in bulk; Padding, cushioning and stuffing materials, except of paper, cardboard, rubber or plastics; Raw fibrous textile materials and substitutes therefor",
    },
    { id: 23, description: "Yarns and threads, for textile use" },
    {
      id: 24,
      description:
        "Textiles and substitutes for textiles; Household linen; Curtains of textile or plastic",
    },
    { id: 25, description: "Clothing, footwear, headwear" },
    {
      id: 26,
      description:
        "Lace, braid and embroidery, and haberdashery ribbons and bows; Buttons, hooks and eyes, pins and needles; Artificial flowers; Hair decorations; False hair",
    },
    {
      id: 27,
      description:
        "Carpets, rugs, mats and matting, linoleum and other materials for covering existing floors; Wall hangings, not of textile",
    },
    {
      id: 28,
      description:
        "Games, toys and playthings; Video game apparatus; Gymnastic and sporting articles; Decorations for Christmas trees",
    },
    {
      id: 29,
      description:
        "Meat, fish, poultry and game; Meat extracts; Preserved, frozen, dried and cooked fruits and vegetables; Jellies, jams, compotes; Eggs; Milk, cheese, butter, yogurt and other milk products; Oils and fats for food",
    },
    {
      id: 30,
      description:
        "Coffee, tea, cocoa and substitutes therefor; Rice, pasta and noodles; Tapioca and sago; Flour and preparations made from cereals; Bread, pastries and confectionery; Chocolate; Ice cream, sorbets and other edible ices; Sugar, honey, treacle; Yeast, baking-powder; Salt, seasonings, spices, preserved herbs; Vinegar, sauces and other condiments; Ice [frozen water]",
    },
    {
      id: 31,
      description:
        "Raw and unprocessed agricultural, aquacultural, horticultural and forestry products; Raw and unprocessed grains and seeds; Fresh fruits and vegetables, fresh herbs; Natural plants and flowers; Bulbs, seedlings and seeds for planting; Live animals; Foodstuffs and beverages for animals; Malt",
    },
    {
      id: 32,
      description:
        "Beers; Non-alcoholic beverages; Mineral and aerated waters; Fruit beverages and fruit juices; Syrups and other preparations for making non-alcoholic beverages",
    },
    {
      id: 33,
      description:
        "Alcoholic beverages, except beers; Alcoholic preparations for making beverages",
    },
    {
      id: 34,
      description:
        "Tobacco and tobacco substitutes; Cigarettes and cigars; Electronic cigarettes and oral vaporizers for smokers; Smokers' articles; Matches",
    },
    {
      id: 35,
      description:
        "Advertising; Business management, organization and administration; Office functions",
    },
    {
      id: 36,
      description:
        "Financial, monetary and banking services; Insurance services; Real estate affairs",
    },
    {
      id: 37,
      description:
        "Construction services; Installation and repair services; Mining extraction, oil and gas drilling",
    },
    { id: 38, description: "Telecommunications services" },
    {
      id: 39,
      description:
        "Transport; Packaging and storage of goods; Travel arrangement",
    },
    {
      id: 40,
      description:
        "Treatment of materials; Recycling of waste and trash; Air purification and treatment of water; Printing services; Food and drink preservation",
    },
    {
      id: 41,
      description:
        "Education; Providing of training; Entertainment; Sporting and cultural activities",
    },
    {
      id: 42,
      description:
        "Scientific and technological services and research and design relating thereto; Industrial analysis, industrial research and industrial design services; Quality control and authentication services; Design and development of computer hardware and software",
    },
    {
      id: 43,
      description:
        "Services for providing food and drink; Temporary accommodation",
    },
    {
      id: 44,
      description:
        "Medical services; Veterinary services; Hygienic and beauty care for human beings or animals; Agriculture, aquaculture, horticulture and forestry services",
    },
    {
      id: 45,
      description:
        "Legal services; Security services for the physical protection of tangible property and individuals; Personal and social services rendered by others to meet the needs of individuals",
    },
  ],
};
const CustomTreeItem = memo(({ node, onClick, ...other }) => {
  return (
    <div>
      <TreeItem
        style={{
          backgroundColor: "#fff",
          width: "100% !important",
        }}
        key={node.code}
        nodeId={node.code}
        node={node}
        label={node.description}
        {...other}
      >
        {Array.isArray(node.children) &&
          node.children.length > 0 &&
          node.children.map((child) => (
            <div style={{ marginLeft: "-17px" }}>
              <CustomTreeItem
                key={child.code}
                node={child}
                style={{
                  backgroundColor: "#fff",
                  width: "100% !important",
                  paddingLeft: "20px",
                }}
              />
            </div>
          ))}
      </TreeItem>
    </div>
  );
});

const chipStyle = {
  zIndex: 1305,
  marginLeft: "5px", // Assuming zIndex.modal + 1 is 1300
};

const TradeMarkSearchComponent = () => {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [primarytext, setPrimarytext] = useState("");
  const [showPrimarydropDown, setShowPrimarydropDown] = useState(false);
  const [showSecondarydropDown, setShowSecondarydropDown] = useState(false);
  const [radioValue, setRadioValue] = useState("true");
  const [jurisdictionData, setJurisdictionData] = useState([]);
  const [trademarkClasses, setTrademarkClasses] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [titleClassData, setTitleClassData] = useState("");
  const [hideChip, setHidechip] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getTrademarkGlobals();
    getTrademarkReleventClass();
  }, []);

  // get jurisdiction data classes and territories
  const getTrademarkGlobals = async () => {
    try {
      const url = "plus/trademark/globals";
      const result = await apiRequest(url, "GET");
      // setJurisdictionData(result && result.territories);
      // setTrademarkClasses(result && result.classes);
      setJurisdictionData(globalData && globalData.territories);
      setTrademarkClasses(globalData && globalData.classes);
      getTransactionData(globalData);
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };

  // get Trademark Relevent Class data
  const getTrademarkReleventClass = async () => {
    // try {
    //   const url = "plus/trademark/relevant-class";
    //   const result = await apiRequest(url, "GET");
    //   setTitleClassData(result && result);
    //   //   console.log(result, "result");
    // } catch (error) {
    //   // Handle error
    //   console.error("Error in POST request:", error);
    // }
  };

  const getTransactionData = async (golbalData) => {
    try {
      const url = "plus/transaction";
      const data = ["TRADEMARK_SEARCH"];
      const result = await apiRequest(url, "POST", data);
      const selectedNamesResponse = result.responses.find(
        (response) => response.type === "TRADEMARK_SEARCH"
      );

      setSelectedClasses(
        selectedNamesResponse && selectedNamesResponse?.obj.classes
      );
      setPrimarytext(
        findObjectByCode(
          golbalData && golbalData.territories && golbalData.territories,
          [
            selectedNamesResponse &&
              selectedNamesResponse.obj &&
              selectedNamesResponse.obj.primaryTerritory,
          ]
        )[0]
      );
      setSelectedNodes(
        findObjectByCode(
          golbalData && golbalData.territories && golbalData.territories,
          [
            selectedNamesResponse &&
              selectedNamesResponse.obj &&
              selectedNamesResponse.obj.otherTerritories,
          ][0]
        )
      );
      setTitleClassData({
        id:
          selectedNamesResponse &&
          selectedNamesResponse.obj &&
          selectedNamesResponse.objaiSuggestedClassId,
        description:
          selectedNamesResponse &&
          selectedNamesResponse.obj &&
          selectedNamesResponse.objaiSuggestedClassDescription,
      });
      setRadioValue(
        selectedNamesResponse && selectedNamesResponse?.obj.useSuggestedClass
          ? "true"
          : "false"
      );
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };
  console.log(selectedNodes, "SelectedNodesSelectedNodes");
  // onclick cross chip remove data
  const handleDelete = (nodeToDelete) => {
    setSelectedNodes((prevNodes) =>
      prevNodes.filter((node) => node.code !== nodeToDelete.code)
    );
  };

  //handle radio feild
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    console.log(event.target.value, "event.target.value");
  };

  const controlProps = (item) => ({
    checked: radioValue == item,
    onChange: handleRadioChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  // handle hide and show dropdown data
  const handleHidePrimaryOption = () => {
    setShowPrimarydropDown(!showPrimarydropDown);
    setShowSecondarydropDown(false);
  };

  // select dropdown for Primary Jurisdictions
  const handlePrimaryDropDown = (event, nodeIds, node_data) => {
    const divValue = event.target.textContent || event.target.innerText;
    const isTextClick = event.target.tagName === "DIV";
    if (isTextClick) {
      if (node_data) {
        setPrimarytext(node_data[0]);
      }
      //   setPrimarytext(divValue);
      setShowPrimarydropDown(false);
    } else {
      // setPrimarytext(primarytext[0]);
    }
  };

  // select dropdown for other Jurisdictions
  const handleSecondaryDropDown = (event, node, node_data) => {
    setShowSecondarydropDown(true);
    const isTextClick = event.target.tagName === "DIV";
    if (isTextClick) {
      if (node_data) {
        setSelectedNodes((prevNodes) => [...prevNodes, node_data[0]]);
      }
      setShowSecondarydropDown(!showSecondarydropDown);
      setShowPrimarydropDown(false);
    } else {
      setShowPrimarydropDown(false);
    }
  };

  // find object from data with code
  const findObjectByCode = (dataArray, codes) => {
    const results = [];
    for (const data of dataArray) {
      const result = findObjectRecursively(data, codes);
      if (result) {
        results.push(result);
      }
    }

    return results;

    function findObjectRecursively(data, codes) {
      if (codes.includes(data.code)) {
        return data;
      }

      if (data.children && data.children.length > 0) {
        for (const child of data.children) {
          const result = findObjectRecursively(child, codes);
          if (result) {
            return result;
          }
        }
      }

      return null;
    }
  };

  // callback get selected classes
  const handletrademarkClasses = (data) => {
    setSelectedClasses(data);
  };

  const styleHandle = (data) => {
    if (data === "hide") {
      setHidechip("hideChip");
    } else {
      setHidechip("");
    }
  };
  const handleCloseModel = () => {
    setShowModal(false);
  };
  const submitTrademarkSearchApi = async () => {
    try {
      const data = {
        primaryTerritory: primarytext.code,
        otherTerritories:
          selectedNodes && selectedNodes.map((territory) => territory.code),
        classes: selectedClasses,
        aiSuggestedClassDescription: titleClassData.id,
        aiSuggestedClassId: titleClassData.description,
        useSuggestedClass: radioValue,
      };
      // const url = "plus/trademark/search";
      // const result = await apiRequest(url, "POST", data);
      setShowModal(true);
    } catch (error) {
      // Handle error
      console.error("Error in POST request:", error);
    }
  };
  console.log(radioValue, "radioValue");
  return (
    <div className="trademark-wrapper">
      <Typography variant="h6" component="h2" style={{ fontWeight: 600 }}>
        Trademark Search
      </Typography>
      <div className="trademark-form">
        <div className="form-title">Select Jurisdiction</div>
        <div className="trademark-field-wrapper">
          <div className="field-label">What is your Primary Jurisdiction:</div>
          <div className="field-text">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Select Jurisdiction"
              onClick={() => handleHidePrimaryOption()}
              value={
                primarytext && primarytext.code + " " + primarytext.description
              }
              className="nonInteractive"
              InputProps={{
                endAdornment: (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "4px" }}>
                      <ExpandMoreIcon />
                    </span>
                  </div>
                ),
              }}
            />
            {showPrimarydropDown && (
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  maxHeight: "500px",
                }}
              >
                <TreeView
                  aria-label="icon expansion"
                  defaultCollapseIcon={
                    <ChevronRightIcon
                      style={{
                        border: "1px solid #E7E7E7",
                        padding: "2px",
                        color: "#545454",
                        margin: "5px 10px",
                      }}
                    />
                  }
                  defaultExpandIcon={
                    <ExpandMoreIcon
                      style={{
                        border: "1px solid #E7E7E7",
                        padding: "2px",
                        color: "#545454",
                        margin: "5px 10px",
                      }}
                    />
                  }
                  onNodeSelect={(event, nodeid) =>
                    handlePrimaryDropDown(
                      event,
                      nodeid,
                      findObjectByCode(jurisdictionData, [nodeid])
                    )
                  }
                >
                  <div className="select-box">
                    {jurisdictionData.map((territory) => (
                      <CustomTreeItem key={territory.code} node={territory} />
                    ))}
                  </div>
                </TreeView>
              </Box>
            )}
          </div>
        </div>

        <div className="trademark-field-wrapper  ">
          <div className="field-label">Select other Jurisdictions:</div>
          <div className="field-text">
            <Autocomplete
              multiple
              id="tags-filled"
              options={[]}
              freeSolo
              value={selectedNodes}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    key={index}
                    variant="filled"
                    label={option.code}
                    {...getTagProps({ index })}
                    className={hideChip}
                    onDelete={() => handleDelete(option)}
                    style={chipStyle} // Prevent the default behavior of the mouse click
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  onClick={() =>
                    setShowSecondarydropDown(!showSecondarydropDown)
                  }
                  placeholder="Select Territories"
                />
              )}
            />
            {showSecondarydropDown && (
              <Box
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                }}
              >
                <TreeView
                  aria-label="icon expansion"
                  defaultCollapseIcon={
                    <ChevronRightIcon
                      style={{
                        border: "1px solid #E7E7E7",
                        padding: "2px",
                        color: "#545454",
                        margin: "5px 10px",
                      }}
                    />
                  }
                  defaultExpandIcon={
                    <ExpandMoreIcon
                      style={{
                        border: "1px solid #E7E7E7",
                        padding: "2px",
                        color: "#545454",
                        margin: "5px 10px",
                      }}
                    />
                  }
                  onNodeSelect={(event, nodeid) =>
                    handleSecondaryDropDown(
                      event,
                      nodeid,
                      findObjectByCode(jurisdictionData, nodeid)
                    )
                  }
                >
                  <div className="select-box">
                    {jurisdictionData &&
                      jurisdictionData.map((territory) => (
                        <CustomTreeItem key={territory} node={territory} />
                      ))}
                  </div>
                </TreeView>
              </Box>
            )}
          </div>
        </div>
        <div className="trademark-ids-box">
          <div className="form-title">Trademark IDS /ICs</div>
          <div className="trademark-field-wrapper ">
            <div className="field-label-info">
              Based on our understanding of business , we think you must apply
              {/* for trademarks under class {titleClassData && titleClassData.id}.
              ({titleClassData && titleClassData.description} ) */}
            </div>
          </div>
          <div className="trademark-field-wrapper ">
            <div className="field-label">
              Should we consider the above trademark class for the trademark
              search?
            </div>
            <div className="field-text">
              <div>
                <Radio
                  {...controlProps("true")}
                  sx={{
                    color: radioValue == "true" ? "#FFB248" : "",
                    "&.Mui-checked": {
                      color: "#FFB248",
                    },
                  }}
                />
                {"Yes"}
                <Radio
                  {...controlProps("false")}
                  sx={{
                    color: radioValue == "false" ? "#FFB248" : "",
                    "&.Mui-checked": {
                      color: "#FFB248",
                    },
                  }}
                />
                {"No"}
              </div>
            </div>
          </div>
          <div className="trademark-field-wrapper  ">
            <div className="field-label">Select other Jurisdictions:</div>
            <div className="field-text">
              <MultiSelectCheckBox
                classes={trademarkClasses}
                handletrademarkClasses={handletrademarkClasses}
                styleHandle={styleHandle}
                selectedItemsCheckbox={selectedClasses}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="button-group">
        <Button
          className="brand-back-button"
          size="large"
          variant="outlined"
          onClick={() => navigate("/domian-availability")}
        >
          Back
        </Button>

        <Button
          className="brand-submit-button"
          size="large"
          variant="contained"
          //   disabled={isLoading}
          onClick={() => submitTrademarkSearchApi()}
        >
          Search
          {/* {isLoading ? "Loading..." : "Search Results"} */}
        </Button>
      </div>
      <AvailableJurisdictionsComponent
        showModal={showModal}
        handleCloseModel={handleCloseModel}
      />
    </div>
  );
};

export default TradeMarkSearchComponent;
