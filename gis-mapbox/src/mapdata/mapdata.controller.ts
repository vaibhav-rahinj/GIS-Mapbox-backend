import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Res,
} from '@nestjs/common';
import { MapdataService } from './mapdata.service';
import { CreateMapdatumDto } from './dto/create-mapdatum.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream, readFileSync } from 'fs';
import type { Response } from 'express';
import { parse } from 'papaparse';
@Controller('mapdata')
export class MapdataController {
  constructor(private readonly mapService: MapdataService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './mapbox',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          callback(null, `${file.originalname}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(csv)$/)) {
          return callback(new Error('Only CSV files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const csvFile = readFileSync('files/data.csv');
    const csvData = csvFile.toString();
    const parsedCsv = await parse(csvData, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.toLowerCase().replace('#', '').trim(),
      complete: (results) => results.data,
    });
    console.log(parsedCsv.data[0]);

    parsedCsv.data.forEach((element) => {
      var point = {
        type: 'Point',
        coordinates: [element.lat, element.lon],
      };
      const loadData = {
        id: parsedCsv.data[0].id,
        lat: parsedCsv.data[0].lat,
        lon: parsedCsv.data[0].lon,
        city: parsedCsv.data[0].city,
        location: point,
        // location:'0101000020E61000007A8D5DA27A1333403FAA61BF27385240',
      };

      console.log(loadData);
      this.mapService.create(loadData);
      const response = {
        message: 'File uploaded successfully!',
        data: {
          originalname: file.originalname,
          // filename: file.filename,
        },
      };
      return response;
    });
  }
}
