/* eslint-disable no-console */
import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod.mjs';
import { logg } from '../utils/logger';

process.env.NODE_ENV = 'production';

webpack(webpackConfig).run((err, stats) => {
    if (err) {
        logg( 0, err );
        return 1;
    }

    const jsonStats = stats.toJson();

    if(jsonStats.hasErrors) {
        return jsonStats.errors.map(error => logg( 1, error ));
    }

    if (jsonStats.hasWarnings) {
        logg( 2, 'Webpack generated the following warnings: ');
        jsonStats.warnings.map(warning => logg( 2, warning));
    }

    logg( 4, `Webpack stats: ${stats}`);

    logg( 4, 'App built to dist/');

    return 0;
});