import { Point } from 'geojson';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Mapdatum {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  lat: string;
  @Column()
  lon: string;
  @Column()
  city: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: Point;
}
