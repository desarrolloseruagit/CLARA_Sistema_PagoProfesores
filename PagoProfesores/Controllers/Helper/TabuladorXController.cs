﻿using PagoProfesores.Models.Helper;
using Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace PagoProfesores.Controllers.Helper
{
    public class TabuladorXController : Controller
    {
        // GET: Tabulador
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public string ConsultarTabulador(string CampusVPDI = "")
        {
            TabuladorModel model = new TabuladorModel();
            model.CampusVPDI = CampusVPDI;

            SessionDB sesion = SessionDB.start(Request, Response, false, model.db, SESSION_BEHAVIOR.AJAX);
            if (sesion == null)
                return "";

            StringBuilder sb = new StringBuilder();
            sb.Append("<option></option>");

            foreach (KeyValuePair<string, string> pair in model.getTabulador())
            {
                sb.Append("<option value=\"").Append(pair.Key).Append("\" ").Append(">").Append(pair.Value).Append("</option>\n");
            }
            return sb.ToString();
        }
    }
}