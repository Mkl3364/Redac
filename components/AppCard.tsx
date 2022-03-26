import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import Link from 'next/link';
import '../public/images/troti-basic.jpeg'

interface AppCardInterface {
  titre: String,
  description: String
  badge : 'ON SALE' | 'OUT OF ORDER'
}

export default function AppCard(props: AppCardInterface) {

  const {titre, description, badge} = props;

  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark'
    ? theme.colors.dark[1]
    : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src="../public/images/troti-basic.jpeg" height={160} alt="Norway" />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{titre}</Text>
          <Badge color="pink" variant="light">
            {badge}
          </Badge>
        </Group>

        <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
          {description}
        </Text>

        <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        <Link href="/edit">
           <a>Edit</a>
        </Link>
        </Button>
      </Card>
      <br />
    </div>
  );
}