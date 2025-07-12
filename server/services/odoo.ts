import * as xmlrpc from "xmlrpc";

import config from '../config/app'
import { IClient } from "./interface/client";

const {
  odoo: { url, db, uid, password }
} = config

const client = xmlrpc.createClient({ url });

class OdooService {
  getOdooClientInfo = async (email: string) => {
    return new Promise((resolve, reject) => {
      client.methodCall(
        "execute_kw",
        [
          db,
          Number(uid),
          password,
          "res.partner",
          "search_read",
          [[["email", "=", email]]],
          { fields: ["name", "vat", "email", "street"] },
        ],
        (err: any, value: any) => {
          if (err) reject(err);
          else resolve(value);
        }
      );
    });
  };

  createOdooClient = async (clientDto: IClient) => {
    return new Promise((resolve, reject) => {
      client.methodCall(
        "execute_kw",
        [
          db,
          Number(uid),
          password,
          "res.partner",
          "create",
          [{ ...clientDto }]
        ],
        (err: any, value: any) => {
          if (err) reject(err);
          else resolve(value);
        }
      );
    })
  }
}

export default new OdooService();
