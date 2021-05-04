/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";
import { Button, Menu } from 'antd';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { useHistory } from 'react-router-dom';
// reactstrap components
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";

var ps;
const menu_data =
{
  "Personas": [
    "Alta",
    "Baja/Anul. Baja",
    "Modificacion",
    "Consulta"
  ],
  "Artículos": [
    "Alta",
    "Baja/Anul. Baja",
    "Modificacion",
    "Consulta",
    {
      "Listas de precios": [
        "Alta",
        "Baja/Anul. Baja",
        "Modificacion",
        "Consulta"
      ]
    },
    {
      "Precios": [
        "Ingreso Manual",
        "Importación desde archivo Excel"
      ]
    }
  ],
  "Contratos": [
    "Alta",
    "Baja/Anul. Baja",
    "Modificacion",
    "Consulta"
  ],
  "Facturación": [
    "Común / RG.2904 / Bono Fiscal / Exportación",
    "Turismo",
    "Automática de Contratos/Servicios"
  ],
  "Registro de Facturas": [
    "Venta Resguardo",
    "Compra"
  ],
  "Comprobantes": [
    "Baja/Anul. Baja",
    "Modificacion",
    "Envio (AFIP/ITF)",
    "Consulta",
    "Consulta PDFs",
    {
      "Otras Consultas": [
        "IVA Ventas",
        "IVA Compras",
        "Interfaz CITI Ventas/Compras RG.3685",
        "Ventas por Artículo",
        "Compras por Artículo",
        "Stock por Artículo",
        {
          "Online Interfacturas": [
            "Varios Comprobantes",
            "Un Comprobantes"
          ]
        },
        "Online AFIP",
        "Archivo XML",
        "Términos y condiciones"
      ]
    }
  ],
  "Administración": [
    {
      "CUIT": [
        "Alta",
        "Baja/Anul. Baja",
        "Modificacion",
        "Cambio Logotipo",
        "Consulta",
        "Solicitud permiso de administrador de CUIT"
      ],
      "Unidad de Negocio": [
        "Alta",
        "Baja/Anul. Baja",
        "Modificacion",
        "Consulta",
        "Solicitud permiso de administrador de UN",
        "Solicitud permiso de operador de servicio de una UN existente"
      ],
      "Puntos de Venta": [
        "Alta",
        "Baja/Anul. Baja",
        "Modificacion",
        "Consulta"
      ],
      "Autorizaciones": [
        "Explorador de Autorizaciones pendientes",
        "Explorador de Autorizaciones (histórico)"
      ],
      "Usuario": [
        "Cambio de Contraseña",
        "Modificación datos de Configuración"
      ]
    }
  ],
  "Administración Site": [
    "Comprobantes",
    "Usuarios",
    "CUITs",
    "UNs",
    "Puntos de Venta",
    "Personas",
    "Permisos",
    "Configuraciones",
    "Logs",
    "Administración",
    "CVs",
    "Búsqueda Laboral"
  ],
  "Ayuda": [

    "Novedades",
    "Documentación técnica"
  ]
}

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  // verifies if routeName is the one active (in browser input)


  createSubMenu = (title, listOfItems) => {
    return <SubMenu key={title} title={title} >
      {listOfItems.map(item => {
        return typeof item == "string"
        ?
        <Menu.Item key={item}  >{item} </Menu.Item > 
        : 
        Object.entries(item).map(([key,value])=>{
          return (
            this.createSubMenu(key,value)
          );
        })
      
      }
      )}
    </SubMenu>
  }
  createSubMenu2 = (title, listOfItems) => {
    return <SubMenu key={title} title={title} >
      {listOfItems.map(item => {
        return typeof subsubitem == "string" 
        ?
         <Menu.Item key={item}>{item}</Menu.Item > 
        : 
        <SubMenu>
           <Menu.Item key={"q onda ganzo"} >{"q onda ganzo"}</Menu.Item > 
        </SubMenu>

      }
      )}
    </SubMenu>

  }
  sideMenuNav = () => {
    return (<Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      style={{ color: "white", backgroundColor: "transparent" }}
      inlineIndent="15"
  
    >

      {Object.entries(menu_data).map(menu_node => (
        this.createSubMenu(menu_node[0], menu_node[1])


      ))}

    </Menu>)

  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  render() {
    const { bgColor, routes, rtlActive, logo } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }
    return (
      <div className="sidebar" data={bgColor} style={{ backgroundColor: "#5e72e4" }}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>

       
              {this.sideMenuNav()}
           
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
