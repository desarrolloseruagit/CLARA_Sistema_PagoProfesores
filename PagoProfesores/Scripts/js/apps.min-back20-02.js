/*   
Version: 1.5.0
Author: 
Website: 
*/

$(function () {

    $(window).load(function () {

     

    });


});//End function jquery




var formValidation = function () {
    
    var inputsarray;
    var formvalidate = true;
    var message = "";

    "use strict"; return {
        
        Inputs: function (array) {

            inputsarray = new Array();
            inputsarray = array;

        },

        Clean: function () {

            for (i = 0; i < inputsarray.length; i++) {
                    $('#' + inputsarray[i]).val('');
                    $('#'+ inputsarray[i]).removeClass('parsley-error');
                }
            $('#notification').html('');
        },

        Validate: function () {
            formvalidate = true;
            for (i = 0; i < inputsarray.length; i++) {
                if (!$('#' + inputsarray[i]).val()) {
                    formvalidate = false;
                    $('#' + inputsarray[i]).addClass('parsley-error');
                }
            }
            if (!formvalidate) {
                $('#notification').html(this.getMessage('Es necesario llenar los campos obligatorios'));
            } else {
                formvalidate = true;
                $('#notification').html('');
                for (i = 0; i < inputsarray.length; i++) {
                    if (!$('#' + inputsarray[i]).val()) {
                       
                        $('#' + inputsarray[i]).removeClass('parsley-error');
                    }
                }
            }
            return formvalidate;
        },


        getMessage: function (msg) {

            var alert = "<div class=\"row\"><div id =\"alerta\" class=\"alert alert-warning fade in\"><span data-dismiss=\"alert\" class=\"close\">X</span><i class=\"fa fa-exclamation fa-2x pull-left\"></i>";
            alert += "<p>" + msg + "</p></div></div>";
            
            return alert;

        },

        notEmpty: function (id,msg) {
          
            $('#' + id).blur(function () {
                if (!$(this).val()) {
                    $(this).addClass('parsley-error');
                    $('#notification').html(formValidation.getMessage(msg));
                } else {
                    $(this).removeClass("parsley-error");
                    $('#notification').html('');
                }
            });


        },

           onlyNumbers: function (id) {

           
               $("#"+id).keydown(function (e) {
                   // Allow: backspace, delete, tab, escape, enter and .
                   if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                       // Allow: Ctrl+A, Command+A
                       (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                       // Allow: home, end, left, right, down, up
                       (e.keyCode >= 35 && e.keyCode <= 40)) {
                       // let it happen, don't do anything
                       return;
                   }
                   // Ensure that it is a number and stop the keypress
                   if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                       e.preventDefault();
                   }
               });

        },

        onlyLetters: function (id) {

        }  

    }


}();


function addEventsDireccion(dir) {

    document.getElementById(dir.idPais).addEventListener("change", function () {
        dir.getValues();
        dir.getEstados();
    }, false);

    document.getElementById(dir.idEstado).addEventListener("change", function () {
        dir.getValues();
        dir.getCiudades();
    }, false);


    document.getElementById(dir.idCiudad).addEventListener("change", function () {
        dir.getValues();
        dir.getMunicipios();
    }, false);

    document.getElementById(dir.idMunicipio).addEventListener("change", function () {
        dir.getValues();
        dir.getColonias();
    }, false);

    document.getElementById(dir.idColonia).addEventListener("change", function () {
        dir.getValues();
        dir.getCP();
    }, false);

    document.getElementById(dir.idCP).addEventListener("keyup", function (e) {
        var event = window.event ? window.event : e;
        var enterKey = 13;
        
        if (event.keyCode == enterKey) {
            dir.CP = $("#" + dir.idCP).val();
            if (dir.CP == '') {
                dir.init(dir);
            } else {
                dir.setCP();
            }
        }
    }, true);

}


function Ciclos(idElement) {

    this.idElement = idElement;
    this.Ciclo = "";

    this.init = function (obj) {

        var dir = eval(obj);
        this.Ciclo = "";
        this.getCiclos();

    };


    this.getCiclos = function () {

        idElement = this.idElement;
        Ciclo = this.Ciclo;
       
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Ciclos/getCiclos/",
            data: "Ciclo=" + Ciclo,
            success: function (data) {
                $('#' + idElement).html(data);

            },
            complete: handlerdataCiclos

        });

    };

}


function Periodos(idElement) {

    this.idElement = idElement;
    this.id_ciclo = "";
    this.Periodo = "";

    this.init = function (obj) {
        
        var dir = eval(obj);
        this.getPeriodos();
        //addEventsDireccion(dir);
    };

    this.getPeriodos = function () {
        
        idElement = this.idElement;
        id_ciclo = this.id_ciclo;
        Periodo = this.Periodo;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Periodos/Periodos/",
            data: "id_ciclo=" + id_ciclo + "&Periodo=" + Periodo,
            success: function (data) {
              
                $('#' + idElement).html(data);
            },complete: handlerdataPeriodos
        });
    };
}

function PeriodosAll(idElement) {

    this.idElement = idElement;

    this.init = function (obj) {
        
        var dir = eval(obj);
        this.getPeriodosAll();
        //addEventsDireccion(dir);
    };

    this.getPeriodosAll = function () {
        
        idElement = this.idElement;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Periodos/Periodos/",
            data: "id_ciclo=&Periodo=",
            success: function (data) {
              
                $('#' + idElement).html(data);
            },complete: handlerdataPeriodos
        });
    };
}


function Niveles(idElement) {

    this.idElement = idElement;
    this.Nivel = "";

    this.init = function (obj) {

        var dir = eval(obj);
        this.Nivel = "";
        this.getNiveles();

    };


    this.getNiveles = function () {

        idElement = this.idElement;
        Nivel = this.Nivel;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Niveles/getNivel/",
            data: "Nivel=" + Nivel,
            success: function (data) {
                $('#' + idElement).html(data);

            }, complete: handlerdataNiveles

        });

    };
}

var Sedes = function () {

	"use strict"; return {

		setSedes: function () {
			var model = { Sede: $('#sedes').val(), };
			$.ajax({
				type: "POST",
				dataType: 'json',
				cache: false,
				url: "/SedeSelector/Save/",
				data: model,
				success: function (data) {
					if (Sedes.setSedes_success != null && typeof Sedes.setSedes_success == 'function')
						Sedes.setSedes_success(data);
				}
			});
		},

		setSedes_success: function () {
			try {
				DataTable.init();
			} catch (e) { }
		},
	}
}();

function addEventsProgramas(dir) {

    document.getElementById(dir.idElementEscuela).addEventListener("change", function () {
        dir.getValues();
        dir.getProgramas();
    }, false);
}

function Programas(idElementEscuela, idElementPrograma) {

    this.idElementEscuela = idElementEscuela;
    this.idElementPrograma = idElementPrograma;
    this.Escuela = "";
    this.Programa = "";

    this.init = function (obj) {

        var dir = eval(obj);
        addEventsProgramas(dir);
    };

    this.getValues = function () {

        this.Escuela = $('#' + idElementEscuela).val();
        // this.Programa = $('#' + idElement).val();      
    };

    this.getProgramas = function () {

        idElement = this.idElement;//idElement
        Escuela = this.Escuela;
        Programa = this.Programa;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Programas/getProgramas/",
            data: "Escuela=" + Escuela + "&Programa=" + Programa,
            success: function (data) {

                $('#' + idElementPrograma).html(data);
            },
        });
    };
}

function Origen(idElement) {

    this.idElement = idElement;
    this.Origen = "";

    this.init = function (obj) {

        // var dir = eval(obj);
        //   addEventsDireccion(dir);

        this.Origen = "";
        this.getOrigen();

    };


    this.getOrigen = function () {

        idElement = this.idElement;
        Origen = this.Origen;


        $.ajax({
            type: "GET",
            cache: false,
            url: "/Origen/getOrigen/",
            data: "Origen=" + Origen,
            success: function (data) {
                $('#' + idElement).html(data);

            }

        });

    };


}

function TiposdeContrato(idElement) {

    this.idElement = idElement;
    this.Contrato = "";

    this.init = function (obj) {

        var dir = eval(obj);
        //   addEventsNiveles(dir);
        this.Contrato = "";
        this.getContrato();
    };

    this.getContrato = function () {

        idElement = this.idElement;
        Contrato = this.Contrato;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/TiposContratos/getContrato/",
            data: "Contrato=" + Contrato,
            success: function (data) {

                $('#' + idElement).html(data);
            }
        });
    };
}

function TiposdePagos(idElement) {

    this.idElement = idElement;
    this.Tpago = "";

    this.init = function (obj) {

        var dir = eval(obj);
        //   addEventsTiposPago(dir);
        this.Tpago = "";
        this.getTiposPagos();
    };

    this.getTiposPagos = function () {

        idElement = this.idElement;
        Tpago = this.Tpago;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/TiposPagos/getTiposPago/",
            data: "Tpago=" + Tpago,
            success: function (data) {
                $('#' + idElement).html(data);
            },
            complete: handlerdataTiposPagos
        });
    };
}

function Escuelas(idElement) {

    this.idElement = idElement;
    this.Escuela = "";

    this.init = function (obj) {

        var dir = eval(obj);
        //   addEventsTiposPago(dir);
        this.Escuela = "";
        this.getEscuela();
    };

    this.getEscuela = function () {

        idElement = this.idElement;
        Escuela = this.Escuela;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Escuelas/getEscuelas/",
            data: "Escuela=" + Escuela,
            success: function (data) {
                $('#' + idElement).html(data);

            }, complete: handlerdataEscuelas
        });
    };
}

function TiposTrasnferencia(idElement) {

    this.idElement = idElement;
    this.Transferencia = "";

    this.init = function (obj) {

        var dir = eval(obj);

        this.Transferencia = "";
        this.getTiposTransferencia();
    };

    this.getTiposTransferencia = function () {

        idElement = this.idElement;
        Transferencia = this.Transferencia;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/TiposTransferencia/getTransferencia/",
            data: "Transferencia=" + Transferencia,
            success: function (data) {
                $('#' + idElement).html(data);
            }
        });
    };
}

function Bloqueos(idElement) {
    this.idElement = idElement;
    this.Bloqueo = "";

    this.init = function (obj) {

        var dir = eval(obj);
        this.Bloqueo = "";
        this.getBloqueos();
    };
    this.getBloqueos = function () {

        idElement = this.idElement;
        Bloqueo = this.Bloqueo;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/TiposBloqueo/getBloqueo/",
            data: "Bloqueo=" + Bloqueo,
            success: function (data) {
                $('#' + idElement).html(data);
            }
        });
    };
}

function CentrosCostos(idElement) {
    this.idElement = idElement;
    this.CampusVPDI = "";
    this.EscuelaCVE = "";
    this.TipoFactura = "";
    this.TipoPagoCVE = "";
    this.CentroCostosID = "";

    this.init = function (obj) {

        var dir = eval(obj);
        this.getCentrocostos();
    };
    this.getCentrocostos = function () {

        idElement = this.idElement;
        CampusVPDI = this.CampusVPDI;
        EscuelaCVE = this.EscuelaCVE;
        TipoFactura = this.TipoFactura;
        TipoPagoCVE = this.TipoPagoCVE;
        CentroCostosID = this.CentroCostosID;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Centrosdecosto/getCentrodecostos/",
            data: "CampusVPDI=" + CampusVPDI + "&EscuelaCVE=" + EscuelaCVE + "&TipoFactura=" + TipoFactura + "&TipoPagoCVE=" + TipoPagoCVE,
            success: function (data) {
                $('#' + idElement).html(data);

                if (CentroCostosID != "" && CentroCostosID != null) {
                    $('#' + idElement + ' option[value=' + CentroCostosID + ']').attr("selected", "selected");
                }
            }
        });
    };
}

function ConceptosdePago(idElement) {
    this.idElement = idElement;
    this.CampusVPDI = "";
    this.EsquemaID = "";
    this.PersonaID = "";
    this.Periodo = "";
    this.Nivel = "";
    this.NumPago = "";

    this.init = function (obj) {

        var dir = eval(obj);
        this.getConceptosdepago();
    };
    this.getConceptosdepago = function () {

        idElement = this.idElement;
        CampusVPDI = this.CampusVPDI;
        EsquemaID = this.EsquemaID;
        PersonaID = this.PersonaID;
        Periodo = this.Periodo;
        Nivel = this.Nivel;
        NumPago = this.NumPago;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/ConceptosdePago/getConceptosdePago/",
            data: "CampusVPDI=" + CampusVPDI + "&EsquemaID=" + EsquemaID + "&PersonaID=" + PersonaID + "&Periodo=" + Periodo + "&Nivel=" + Nivel,
            success: function (data) {
                $('#' + idElement).html(data);

                if (NumPago != "" && NumPago != null) {
                    $('#' + idElement + ' option[value=' + NumPago + ']').attr("selected", "selected");
                }
            }
        });
    };
}

function ConceptosdePagoEsquema(idElement) {
    this.idElement = idElement;
    this.CampusVPDI = "";
    this.EsquemaID = "";

    this.init = function (obj) {
        
        var dir = eval(obj);
        this.getConceptosdepagoEsquema();
    };
    this.getConceptosdepagoEsquema = function () {

        idElement = this.idElement;
        EsquemaID = this.EsquemaID;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/ConceptosdePago/getConceptosdePagoEsquema/",
            data: "EsquemaID=" + EsquemaID,
            success: function (data) {
                $('#' + idElement).html(data);
            }
        });
    };
}

function FechasdePagoEsquema(idElement) {
    this.idElement = idElement;
    this.EsquemaID = "";

    this.init = function (obj) {

        var dir = eval(obj);
        this.getFechasdepagoEsquema();
    };
    this.getFechasdepagoEsquema = function () {

        idElement = this.idElement;
        EsquemaID = this.EsquemaID;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/ConceptosdePago/getFechasdePagoEsquema/",
            data: "EsquemaID=" + EsquemaID,
            success: function (data) {
                $('#' + idElement).html(data);
            }, complete: handlerdataFechasdepagoEsquema
        });
    };
}

function CentrosCostosAll(idElement) {
    this.idElement = idElement;

    this.init = function (obj) {
        var dir = eval(obj);
        this.getCentrocostosAll();
    };

    this.getCentrocostosAll = function () {
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Centrosdecosto/getCentrodecostosAll/",
            success: function (data) {
                $('#' + idElement).html(data);
            }
        });
    }
}

function Esquema(idElement) {

    this.idElement = idElement;
    this.Periodo = "";
    this.Sede = "";
    this.Nivel = "";

    this.init = function (obj) {
        var dir = eval(obj);
        this.getEsquema();
    };

    this.getEsquema = function () {

        idElement = this.idElement;
        Periodo = this.Periodo;
        Sede = this.Sede;
        Nivel = this.Nivel;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/EsquemasPago/ConsultarEsquema/",
            data: "Periodo=" + Periodo + "&CampusVPDI=" + Sede + "&Nivel=" + Nivel,
            success: function (data) {
                $('#' + idElement).html(data);
            }
        });
    };
}

function EsquemaAll(idElement) {

    this.idElement = idElement;

    this.init = function (obj) {
        var dir = eval(obj);
        this.getEsquemaAll();
    };

    this.getEsquemaAll = function () {

        idElement = this.idElement;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/EsquemasPago/ConsultarEsquema/",
            data: "Periodo=&CampusVPDI=&Nivel=",
            success: function (data) {
                $('#' + idElement).html(data);
            }
        });
    };
}

function TiposFactura(idElement) {

    this.idElement = idElement;
    this.Tfactura = "";

    this.init = function (obj) {

        var dir = eval(obj);

        this.Tfactura = "";
        this.getTiposFactura();
    };

    this.getTiposFactura = function () {

        idElement = this.idElement;
        Tfactura = this.Tfactura;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/TiposdeFactura/getTiposFactura/",
            data: "Tfactura=" + Tfactura,
            success: function (data) {
                $('#' + idElement).html(data);
            }
        });
    };
}

function Direccion(idCP, idPais, idEstado, idCiudad, idMunicipio, idColonia) {

    this.idCP = idCP;
    this.CP = "";
    this.idPais = idPais;
    this.Pais = "";
    this.idEstado = idEstado;
    this.Estado = "";
    this.idCiudad = idCiudad;
    this.Ciudad = "";
    this.idMunicipio = idMunicipio;
    this.Municipio = "";
    this.idColonia = idColonia;
    this.Colonia = "";
    

    this.init = function (obj) {
            
         var dir = eval(obj);
         addEventsDireccion(dir);
        
        $('#' + idEstado).html("");
        $('#' + idCiudad).html("");
        $('#' + idMunicipio).html("");
        $('#' + idColonia).html("");
        this.Pais = "";
        this.getPaises();

    };

    

    this.getValues = function () {

        
        this.Pais = $('#' + idPais).val();
        this.Estado = $('#' + idEstado).val();
        this.Ciudad = $('#' + idCiudad).val();
        this.Municipio = $('#' + idMunicipio).val();
        this.Colonia = $('#' + idColonia).val();


    };

    this.getPaises = function () {

        idPais = this.idPais;
        Pais = this.Pais;

       
        $.ajax({
            type: "GET",
            cache: false,
            url: "/Direcciones/Paises/",
            data: "Pais=" + Pais,
            success: function (data) {
                $('#' + idPais).html(data);
            }

        });

    };

    this.getCP = function () {

        var model =
           {
               estado: this.Estado,
               ciudad : this.Ciudad,
               municipio  : this.Municipio,
               colonia: this.Colonia,
           }

        $.ajax({
            type: "POST",
            dataType: 'json',
            cache: false,
            url: "/Direcciones/getCP/",
            data: model,
            success: function (data) {
                data = jQuery.parseJSON(data);
                   
                $('#' + idCP).val(data.codigo);
                    
            },
            error: function (data) {
                console.log("error CodigoPostal");

            }
        });

    };


    this.setCP = function () {
        var codigo = this.CP;
        if (codigo == "" || codigo == null) { this.init(); return; }

        var model =
            {
                codigo: codigo
            }

        $.ajax({
            type: "POST",
            dataType: 'json',
            object: this,
            cache: false,
            url: "/Direcciones/getPaisEstadoCiudadMunicipio/",
            data: model,
            success: function (data) {
                data = jQuery.parseJSON(data);
                this.object.Pais = data.pais;
                this.object.Estado = data.estado;
                this.object.Ciudad = data.ciudad;
                this.object.Municipio = data.municipio;
                

                this.object.getPaises();
                this.object.getEstados();
                this.object.getCiudades();
                this.object.getMunicipios();
                this.object.getColonias();
            }
        });
    };



    this.getEstados = function () {
        

        idEstado = this.idEstado;
        Estado = this.Estado;
        Pais = this.Pais;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Direcciones/Estados/",
            data: "Pais=" + Pais + "&Estado=" + Estado,
            success: function (data) {

               
                $('#' + idEstado).html(data);

            },

        });
    };


    this.getCiudades = function () {

        idPais = this.idPais;
        idEstado = this.idEstado;
        idCiudad = this.idCiudad;

        Pais = this.Pais;
        Estado = this.Estado;
        Ciudad = this.Ciudad;

        $.ajax({
            type: "GET",
            cache: false,
            url: "/Direcciones/Ciudades/",
            data: "Pais=" + Pais + "&Estado=" + Estado + "&Ciudad=" + Ciudad,
            success: function (data) {

                $('#' + idCiudad).html(data);

            },

        });
    };


    this.getMunicipios = function () {

        idPais = this.idPais;
        idEstado = this.idEstado;
        idCiudad = this.idCiudad;
        idMunicipio = this.idMunicipio;

        Pais = this.Pais;
        Estado = this.Estado;
        Ciudad = this.Ciudad;
        Municipio = this.Municipio;


        $.ajax({
            type: "GET",
            cache: false,
            url: "/Direcciones/Municipios/",
            data: "Pais=" + Pais + "&Estado=" + Estado + "&Ciudad=" + Ciudad + "&Municipio=" + Municipio,
            success: function (data) {
                $('#' + idMunicipio).html(data);

            },

        });
    };

    this.getColonias = function () {

        idPais = this.idPais;
        idEstado = this.idEstado;
        idCiudad = this.idCiudad;
        idMunicipio = this.idMunicipio;
        idColonia = this.idColonia;

        Pais = this.Pais;
        Estado = this.Estado;
        Ciudad = this.Ciudad;
        Municipio = this.Municipio;
        Colonia = this.Colonia;
        CP = $('#' + this.idCP).val();


        $.ajax({
            type: "GET",
            cache: false,
            url: "/Direcciones/Colonias/",
            data: "Pais=" + Pais + "&Estado=" + Estado + "&Ciudad=" + Ciudad + "&Municipio=" + Municipio + "&Colonia=" + Colonia + "&CP=" + CP,
            success: function (data) {

                $('#' + idColonia).html(data);
            },

        });
    };


}

var session_error = function (msg) {
	if ((typeof msg) == "object")
		msg = msg.responseText;
	if ((typeof msg) == "string")
		if (0 <= msg.indexOf('<session_error>') || msg == "-1") {
			$('#modal-session').modal("show");
			return true;
		}
	return false;
}

var session_close = function () {
	window.location.href = '/Login/Start';
}

var session_keep = function () {
	$.ajax({
		type: 'POST',
		cache: false,
		url: "/Login/KeepSession/",
		data: 'session_val=' + $('#session_val').val(),
		success: function (data) {
			if (data != "ok") { }
			$('#modal-session').modal("hide");
		}
	});
}


/*+++++++++DATATABLECHEKBOX+++++++++++*/

function DataTable_ChangeChecked(checkbox, DataTableName) {
    try {
        var ____DataTable = null;
        if (typeof DataTableName == 'string') ____DataTable = eval(DataTableName);
        else if (typeof DataTableName == 'object') ____DataTable = DataTableName;
        
        var arr = ____DataTable.checkboxs;
        for (var i = 0; i < arr.length; i++)
            $('#' + arr[i]).prop('checked', checkbox.checked);
    }
    catch (ex) { }
}

var handleSlimScroll = function () { "use strict"; $("[data-scrollbar=true]").each(function () { generateSlimScroll($(this)) }) }; var generateSlimScroll = function (e) { var t = $(e).attr("data-height"); t = !t ? $(e).height() : t; var n = { height: t, alwaysVisible: true }; if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { n.wheelStep = 3; n.touchScrollStep = 100 } $(e).slimScroll(n) }; var handleSidebarMenu = function () { "use strict"; $(".sidebar .nav > .has-sub > a").click(function () { var e = $(this).next(".sub-menu"); var t = ".sidebar .nav > li.has-sub > .sub-menu"; if ($(".page-sidebar-minified").length === 0) { $(t).not(e).slideUp(250, function () { $(this).closest("li").removeClass("expand") }); $(e).slideToggle(250, function () { var e = $(this).closest("li"); if ($(e).hasClass("expand")) { $(e).removeClass("expand") } else { $(e).addClass("expand") } }) } }); $(".sidebar .nav > .has-sub .sub-menu li.has-sub > a").click(function () { if ($(".page-sidebar-minified").length === 0) { var e = $(this).next(".sub-menu"); $(e).slideToggle(250) } }) }; var handleMobileSidebarToggle = function () { var e = false; $(".sidebar").on("click touchstart", function (t) { if ($(t.target).closest(".sidebar").length !== 0) { e = true } else { e = false; t.stopPropagation() } }); $(document).on("click touchstart", function (t) { if ($(t.target).closest(".sidebar").length === 0) { e = false } if (!t.isPropagationStopped() && e !== true) { if ($("#page-container").hasClass("page-sidebar-toggled")) { $("#page-container").removeClass("page-sidebar-toggled") } if ($(window).width() < 979) { if ($("#page-container").hasClass("page-with-two-sidebar")) { $("#page-container").removeClass("page-right-sidebar-toggled") } } } }); $("[data-click=right-sidebar-toggled]").click(function (e) { e.stopPropagation(); var t = "#page-container"; var n = "page-right-sidebar-collapsed"; n = $(window).width() < 979 ? "page-right-sidebar-toggled" : n; if ($(t).hasClass(n)) { $(t).removeClass(n) } else { $(t).addClass(n) } if ($(window).width() < 480) { $("#page-container").removeClass("page-sidebar-toggled") } }); $("[data-click=sidebar-toggled]").click(function (e) { e.stopPropagation(); var t = "page-sidebar-toggled"; var n = "#page-container"; if ($(n).hasClass(t)) { $(n).removeClass(t) } else { $(n).addClass(t) } if ($(window).width() < 480) { $("#page-container").removeClass("page-right-sidebar-toggled") } }) }; var handleSidebarMinify = function () { $("[data-click=sidebar-minify]").click(function (e) { e.preventDefault(); var t = "page-sidebar-minified"; var n = "#page-container"; if ($(n).hasClass(t)) { $(n).removeClass(t); if ($(n).hasClass("page-sidebar-fixed")) { generateSlimScroll($('#sidebar [data-scrollbar="true"]')) } } else { $(n).addClass(t); if ($(n).hasClass("page-sidebar-fixed")) { $('#sidebar [data-scrollbar="true"]').slimScroll({ destroy: true }); $('#sidebar [data-scrollbar="true"]').removeAttr("style") } $("#sidebar [data-scrollbar=true]").trigger("mouseover") } $(window).trigger("resize") }) }; var handlePageContentView = function () { "use strict"; $.when($("#page-loader").addClass("hide")).done(function () { $("#page-container").addClass("in") }) }; var handlePanelAction = function () {
    "use strict"; $("[data-click=panel-remove]").hover(function () { $(this).tooltip({ title: "Remove", placement: "bottom", trigger: "hover", container: "body" }); $(this).tooltip("show") }); $("[data-click=panel-remove]").click(function (e) { e.preventDefault(); $(this).tooltip("destroy"); $(this).closest(".panel").remove() }); $("[data-click=panel-collapse]").hover(function () { $(this).tooltip({ title: "Collapse / Expand", placement: "bottom", trigger: "hover", container: "body" }); $(this).tooltip("show") }); $("[data-click=panel-collapse]").click(function (e) { e.preventDefault(); $(this).closest(".panel").find(".panel-body").slideToggle() });

$("[data-click=panel-reload]").hover(function(){$(this).tooltip({title:"Reload",placement:"bottom",trigger:"hover",container:"body"});


$(this).tooltip("show")});

$("[data-click=panel-reload]").click(function(e){e.preventDefault();
var t=$(this).closest(".panel");
if(!$(t).hasClass("panel-loading"))
{var n=$(t).find(".panel-body");
var r='<div class="panel-loader"><span class="spinner-small"></span></div>';
$(t).addClass("panel-loading");
$(n).prepend(r);

setTimeout(function(){$(t).removeClass("panel-loading");$(t).find(".panel-loader").remove()},2e3)}
});


$("[data-click=panel-expand]").hover(function () { $(this).tooltip({ title: "Abrir / Cerrar", placement: "bottom", trigger: "hover", container: "body" }); $(this).tooltip("show") }); $("[data-click=panel-expand]").click(function (e) { e.preventDefault(); var t = $(this).closest(".panel"); var n = $(t).find(".panel-body"); var r = 40; if ($(n).length !== 0) { var i = $(t).offset().top; var s = $(n).offset().top; r = s - i } if ($("body").hasClass("panel-expand") && $(t).hasClass("panel-expand")) { $("body, .panel").removeClass("panel-expand"); $(".panel").removeAttr("style"); $(n).removeAttr("style") } else { $("body").addClass("panel-expand"); $(this).closest(".panel").addClass("panel-expand"); if ($(n).length !== 0 && r != 40) { var o = 40; $(t).find(" > *").each(function () { var e = $(this).attr("class"); if (e != "panel-heading" && e != "panel-body") { o += $(this).height() + 30 } }); if (o != 40) { $(n).css("top", o + "px") } } } $(window).trigger("resize") })
}; var handleDraggablePanel = function () { "use strict"; var e = $(".panel").parent("[class*=col]"); var t = ".panel-heading"; var n = ".row > [class*=col]"; $(e).sortable({ handle: t, connectWith: n, stop: function (e, t) { t.item.find(".panel-title").append('<i class="fa fa-refresh fa-spin m-l-5" data-id="title-spinner"></i>'); handleSavePanelPosition(t.item) } }) }; var handelTooltipPopoverActivation = function () { "use strict"; $("[data-toggle=tooltip]").tooltip(); $("[data-toggle=popover]").popover() }; var handleScrollToTopButton = function () { "use strict"; $(document).scroll(function () { var e = $(document).scrollTop(); if (e >= 200) { $("[data-click=scroll-top]").addClass("in") } else { $("[data-click=scroll-top]").removeClass("in") } }); $("[data-click=scroll-top]").click(function (e) { e.preventDefault(); $("html, body").animate({ scrollTop: $("body").offset().top }, 500) }) }; var handleThemePageStructureControl = function () { if ($.cookie && $.cookie("theme")) { if ($(".theme-list").length !== 0) { $(".theme-list [data-theme]").closest("li").removeClass("active"); $('.theme-list [data-theme="' + $.cookie("theme") + '"]').closest("li").addClass("active") } var e = "assets/css/theme/" + $.cookie("theme") + ".css"; $("#theme").attr("href", e) } if ($.cookie && $.cookie("sidebar-styling")) { if ($(".sidebar").length !== 0 && $.cookie("sidebar-styling") == "grid") { $(".sidebar").addClass("sidebar-grid"); $('[name=sidebar-styling] option[value="2"]').prop("selected", true) } } if ($.cookie && $.cookie("header-styling")) { if ($(".header").length !== 0 && $.cookie("header-styling") == "navbar-inverse") { $(".header").addClass("navbar-inverse"); $('[name=header-styling] option[value="2"]').prop("selected", true) } } if ($.cookie && $.cookie("content-gradient")) { if ($("#page-container").length !== 0 && $.cookie("content-gradient") == "enabled") { $("#page-container").addClass("gradient-enabled"); $('[name=content-gradient] option[value="2"]').prop("selected", true) } } if ($.cookie && $.cookie("content-styling")) { if ($("body").length !== 0 && $.cookie("content-styling") == "black") { $("body").addClass("flat-black"); $('[name=content-styling] option[value="2"]').prop("selected", true) } } $(".theme-list [data-theme]").live("click", function () { var e = "assets/css/theme/" + $(this).attr("data-theme") + ".css"; $("#theme").attr("href", e); $(".theme-list [data-theme]").not(this).closest("li").removeClass("active"); $(this).closest("li").addClass("active"); $.cookie("theme", $(this).attr("data-theme")) }); $(".theme-panel [name=header-styling]").live("change", function () { var e = $(this).val() == 1 ? "navbar-default" : "navbar-inverse"; var t = $(this).val() == 1 ? "navbar-inverse" : "navbar-default"; $("#header").removeClass(t).addClass(e); $.cookie("header-styling", e) }); $(".theme-panel [name=sidebar-styling]").live("change", function () { if ($(this).val() == 2) { $("#sidebar").addClass("sidebar-grid"); $.cookie("sidebar-styling", "grid") } else { $("#sidebar").removeClass("sidebar-grid"); $.cookie("sidebar-styling", "default") } }); $(".theme-panel [name=content-gradient]").live("change", function () { if ($(this).val() == 2) { $("#page-container").addClass("gradient-enabled"); $.cookie("content-gradient", "enabled") } else { $("#page-container").removeClass("gradient-enabled"); $.cookie("content-gradient", "disabled") } }); $(".theme-panel [name=content-styling]").live("change", function () { if ($(this).val() == 2) { $("body").addClass("flat-black"); $.cookie("content-styling", "black") } else { $("body").removeClass("flat-black"); $.cookie("content-styling", "default") } }); $(".theme-panel [name=sidebar-fixed]").live("change", function () { if ($(this).val() == 1) { if ($(".theme-panel [name=header-fixed]").val() == 2) { alert("Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar."); $('.theme-panel [name=header-fixed] option[value="1"]').prop("selected", true); $("#header").addClass("navbar-fixed-top"); $("#page-container").addClass("page-header-fixed") } $("#page-container").addClass("page-sidebar-fixed"); if (!$("#page-container").hasClass("page-sidebar-minified")) { generateSlimScroll($('.sidebar [data-scrollbar="true"]')) } } else { $("#page-container").removeClass("page-sidebar-fixed"); if ($(".sidebar .slimScrollDiv").length !== 0) { if ($(window).width() <= 979) { $(".sidebar").each(function () { if (!($("#page-container").hasClass("page-with-two-sidebar") && $(this).hasClass("sidebar-right"))) { $(this).find(".slimScrollBar").remove(); $(this).find(".slimScrollRail").remove(); $(this).find('[data-scrollbar="true"]').removeAttr("style"); var e = $(this).find('[data-scrollbar="true"]').parent(); var t = $(e).html(); $(e).replaceWith(t) } }) } else if ($(window).width() > 979) { $('.sidebar [data-scrollbar="true"]').slimScroll({ destroy: true }); $('.sidebar [data-scrollbar="true"]').removeAttr("style") } } if ($("#page-container .sidebar-bg").length === 0) { $("#page-container").append('<div class="sidebar-bg"></div>') } } }); $(".theme-panel [name=header-fixed]").live("change", function () { if ($(this).val() == 1) { $("#header").addClass("navbar-fixed-top"); $("#page-container").addClass("page-header-fixed"); $.cookie("header-fixed", true) } else { if ($(".theme-panel [name=sidebar-fixed]").val() == 1) { alert("Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar."); $('.theme-panel [name=sidebar-fixed] option[value="2"]').prop("selected", true); $("#page-container").removeClass("page-sidebar-fixed"); if ($("#page-container .sidebar-bg").length === 0) { $("#page-container").append('<div class="sidebar-bg"></div>') } } $("#header").removeClass("navbar-fixed-top"); $("#page-container").removeClass("page-header-fixed"); $.cookie("header-fixed", false) } }) }; var handleThemePanelExpand = function () { $('[data-click="theme-panel-expand"]').live("click", function () { var e = ".theme-panel"; var t = "active"; if ($(e).hasClass(t)) { $(e).removeClass(t) } else { $(e).addClass(t) } }) }; var handleAfterPageLoadAddClass = function () { if ($("[data-pageload-addclass]").length !== 0) { $(window).load(function () { $("[data-pageload-addclass]").each(function () { var e = $(this).attr("data-pageload-addclass"); $(this).addClass(e) }) }) } }; var handleSavePanelPosition = function (e) { "use strict"; if ($(".ui-sortable").length !== 0) { var t = []; var n = 0; $.when($(".ui-sortable").each(function () { var e = $(this).find("[data-sortable-id]"); if (e.length !== 0) { var r = []; $(e).each(function () { var e = $(this).attr("data-sortable-id"); r.push({ id: e }) }); t.push(r) } else { t.push([]) } n++ })).done(function () { var n = window.location.href; n = n.split("?"); n = n[0]; localStorage.setItem(n, JSON.stringify(t)); $(e).find('[data-id="title-spinner"]').delay(500).fadeOut(500, function () { $(this).remove() }) }) } }; var handleLocalStorage = function () { "use strict"; if (typeof Storage !== "undefined") { var e = window.location.href; e = e.split("?"); e = e[0]; var t = localStorage.getItem(e); if (t) { t = JSON.parse(t); var n = 0; $(".panel").parent('[class*="col-"]').each(function () { var e = t[n]; var r = $(this); $.each(e, function (e, t) { var n = '[data-sortable-id="' + t.id + '"]'; if ($(n).length !== 0) { var i = $(n).clone(); $(n).remove(); $(r).append(i) } }); n++ }) } } else { alert("Your browser is not supported with the local storage") } }; var handleResetLocalStorage = function () { "use strict"; $("[data-click=reset-local-storage]").live("click", function (e) { e.preventDefault(); var t = "" + '<div class="modal fade" data-modal-id="reset-local-storage-confirmation">' + '    <div class="modal-dialog">' + '        <div class="modal-content">' + '            <div class="modal-header">' + '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">Ã—</button>' + '                <h4 class="modal-title"><i class="fa fa-refresh m-r-5"></i> Reset Local Storage Confirmation</h4>' + "            </div>" + '            <div class="modal-body">' + '                <div class="alert alert-info m-b-0">Would you like to RESET all your saved widgets and clear Local Storage?</div>' + "            </div>" + '            <div class="modal-footer">' + '                <a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal"><i class="fa fa-close"></i> No</a>' + '                <a href="javascript:;" class="btn btn-sm btn-inverse" data-click="confirm-reset-local-storage"><i class="fa fa-check"></i> Yes</a>' + "            </div>" + "        </div>" + "    </div>" + "</div>"; $("body").append(t); $('[data-modal-id="reset-local-storage-confirmation"]').modal("show") }); $('[data-modal-id="reset-local-storage-confirmation"]').live("hidden.bs.modal", function () { $('[data-modal-id="reset-local-storage-confirmation"]').remove() }); $("[data-click=confirm-reset-local-storage]").live("click", function (e) { e.preventDefault(); var t = window.location.href; t = t.split("?"); t = t[0]; localStorage.removeItem(t); window.location.href = document.URL }) }; var App = function () { "use strict"; return { init: function () { handleDraggablePanel(); handleLocalStorage(); handleResetLocalStorage(); handleSlimScroll(); handleSidebarMenu(); handleMobileSidebarToggle(); handleSidebarMinify(); handleThemePageStructureControl(); handleThemePanelExpand(); handleAfterPageLoadAddClass(); handlePanelAction(); handelTooltipPopoverActivation(); handleScrollToTopButton(); handlePageContentView() } } }()

// ___________________________________________________________________________
// TIMER - Progress Bar
var PB_keepTimer = false;
var PB_timerProgressBar = null;
var PB_id_vdata = "x";
var PB_onfinish;
function initProgressBar() {
    $('#div_progressbar').hide();
}
function startTimer(id_vdata, f_onfinish) {
    $('#progressbar_loading').val("0");
    $('#div_percentage_id').html('0 %');
    $('#div_progressbar').show();
    PB_keepTimer = true;
    resetTimer();
    if (id_vdata == null)
        id_vdata = "";
    PB_id_vdata = id_vdata;
    PB_onfinish = f_onfinish;
}

function stopTimer() {
    PB_keepTimer = false;
    removeTimer();
}

function resetTimer() {
    removeTimer();
    if (console) console.log('resetTimer');
    PB_timerProgressBar = setInterval(PB_timerProgressBar_Tick, 1000);
}
function removeTimer() {
    if (console) console.log('closeTimer');
    if (PB_timerProgressBar != null) {
        clearTimeout(PB_timerProgressBar);
        PB_timerProgressBar = null;
    }
}
function PB_timerProgressBar_Tick() {
    removeTimer();
    $.ajax({
        type: 'POST',
        url: '/GetProgress/Start',
        cache: false,
        data: 'id=' + PB_id_vdata,
        success: function (msg) {
            if (msg != null && msg.length < 5) {
                if (msg != "100") {
                    $('#progressbar_loading').val(msg);
                    $('#div_percentage_id').html(msg + " %");
                }
                else {
                    PB_keepTimer = false;
                    $('#div_progressbar').hide();
                    $('#progressbar_loading').val('0');
                    $('#div_percentage_id').html('0 %');
                    $.ajax({
                        type: 'POST',
                        url: '/GetProgress/Start',
                        cache: false,
                        data: 'id=' + PB_id_vdata + '&reset=true',
                        success: function (msg) {
                            if (PB_onfinish != null && (typeof PB_onfinish) == "function")
                                PB_onfinish();
                        }
                    });
                }
            }
            if (PB_keepTimer) resetTimer();
        }
    });
}
// ___________________________________________________________________________


function loading(type,element,text) {

    switch (type) {

        case 'loading-circle':
            $(element).block({
                css: { backgroundColor: 'transparent', color: '#336B86', border: "null" },
                overlayCSS: { backgroundColor: '#FFF' },
                message: '<img src="Content/images/datatable-loader.gif" /><br><h5> '+text+'</h5>'
            });
            break;

       case 'loading-bar':
            $('.loader-min-bar').show();
            break;

        case 'stop':
            $(element).unblock();
            break;
    }



}