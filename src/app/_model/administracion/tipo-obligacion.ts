export class TipoObligacion {
    sec_tipo_obligacion: number;
    documento: string;
    descripcion: string;
    d_cod_estado:string;

    toAddFormat(): any{
        return {
            documento: this.documento,
            descripcion: this.descripcion
        }
    }
    toEditFormat(): any{
        return {
            sec_tipo_obligacion: this.sec_tipo_obligacion,
            documento: this.documento,
            descripcion: this.descripcion
        }
    }


}
