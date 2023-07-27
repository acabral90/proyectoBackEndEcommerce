export const getLogs = async (req, res)=>{
    req.logger.fatal('Nivel fatal');
    req.logger.error('Nivel error');
    req.logger.warning('Nivel warning');
    req.logger.info('Nivel info');
    req.logger.debug('Nivel debug')
    res.send('Prueba de niveles de errores')
}